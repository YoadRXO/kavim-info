import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Controller('dan-badarom')
export class ProxyController {
  @Get()
  async proxyRequest(@Query('date') date: string, @Res() res: Response) {
    if (!date) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Date parameter is required',
      });
    }

    const targetUrl = `https://www.danbadarom.co.il/${date}`;
    const targetPage2 = `https://www.danbadarom.co.il/${date}/page/2`;

    let page1 = '';
    let page2 = '';

    try {
      // Fetch Page 1
      const response = await axios.get(targetUrl);
      const $ = cheerio.load(response.data);
      page1 = $('div.page-content').text().trim().replace(/\s+/g, ' ');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log(`Page 1 not found: ${targetUrl}`);
        return res.status(HttpStatus.NOT_FOUND).json({
          error: 'Page 1 not found',
        });
      }

      console.error(`Error fetching Page 1: ${targetUrl}`, error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error fetching Page 1',
      });
    }

    try {
      // Fetch Page 2
      const responsePage = await axios.get(targetPage2);
      const $ = cheerio.load(responsePage.data);
      page2 = $('div.page-content').text().trim().replace(/\s+/g, ' ');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log(`Page 2 not found, skipping: ${targetPage2}`);
      } else {
        console.error(`Error fetching Page 2: ${targetPage2}`, error.message);
      }
    }

    // Send the response
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK).json({
      page1Content: page1,
      page2Content: page2,
    });
  }
}
