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
      // Construct the target URL using the date
      const targetUrl = `https://www.danbadarom.co.il/${date}`;
      const targetPage2 = `https://www.danbadarom.co.il/${date}/page/2`;

      // Make the request to the target server using axios
      const response = await axios.get(targetUrl);
      const responsePage = await axios.get(targetPage2);
      if (response.status === 404) {
        return res.status(HttpStatus.NOT_FOUND).json({
          error: 'Page not found',
        });
      }

      // Parse the HTML response with Cheerio
      const pageElement1 = cheerio.load(response.data);
      const pageElement2 = cheerio.load(responsePage.data);

      // Use Cheerio to find the specific div you need (example: a div with a specific class)
      let page1 = pageElement1('div.page-content').text(); // Example: find a div with class 'some-class'
      let page2 = pageElement2('div.page-content').text(); // Example: find a div with class 'some-class'
      page1 = page1
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/^\s+|\s+$/g, ''); // Trim leading and trailing spaces
      page2 = page2
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/^\s+|\s+$/g, ''); // Trim leading and trailing spaces
      // You can filter more content if needed, for example:
      // const specificDiv = $('div#specificId').text();

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
      res
        .status(response.status)
        .send({ page1Content: page1, page2Content: page2 }); // Send filtered content, you can modify as needed
    } catch (error) {
      console.error('Error while proxying request:', error.status);
      console.error('Error while proxying request:', error.config.url);

      if (axios.isAxiosError(error)) {
        const status =
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          error:
            error.message || 'An error occurred while processing your request',
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Internal Server Error',
      });
    }
  }
}
