import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios'; // Axios is used for making HTTP requests
import * as cheerio from 'cheerio'; // Import Cheerio for HTML parsing

@Controller('dan-badarom')
export class ProxyController {
  @Get()
  async proxyRequest(@Query('date') date: string, @Res() res: Response) {
    // Validate the date query parameter
    if (!date) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Date parameter is required',
      });
    }

    try {
      console.log('Proxying request for date:', date);

      // Construct the target URL using the date
      const targetUrl = `https://www.danbadarom.co.il/${date}/`;

      // Make the request to the target server using axios
      const response = await axios.get(targetUrl);

      // Parse the HTML response with Cheerio
      const $ = cheerio.load(response.data);

      // Use Cheerio to find the specific div you need (example: a div with a specific class)
      let divContent = $('div.page-content').text(); // Example: find a div with class 'some-class'
      divContent = divContent
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/^\s+|\s+$/g, ''); // Trim leading and trailing spaces
      // You can filter more content if needed, for example:
      // const specificDiv = $('div#specificId').text();

      console.log('Extracted Div Content:', divContent);

      // Set the headers to indicate that we're sending HTML content
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );

      // Send the filtered content as the response (or send the whole HTML if needed)
      res.status(response.status).send(divContent); // Send filtered content, you can modify as needed
    } catch (error) {
      console.error('Error while proxying request:', error);

      // Handle error and send an appropriate response
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to fetch data from the target server',
      });
    }
  }
}
