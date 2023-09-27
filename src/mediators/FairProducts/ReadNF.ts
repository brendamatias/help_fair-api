import http from 'node:http';
import * as cheerio from 'cheerio';

import response from '../../config/response';
import FairProduct, { Measure } from '../../models/FairProduct';

type CreateProductsRequest = {
  url: string;
  fair: string;
};

export default async ({ fair, url }: CreateProductsRequest) => {
  const products: {
    name: string;
    price: string;
    qty: number;
    fair: string;
    bought: boolean;
    measure: Measure;
  }[] = [];

  let str = '';

  const req = http.request(url, (res) => {
    res.on('data', (chunk) => {
      str += chunk;
    });

    res.on('end', async () => {
      const $ = cheerio.load(str);
      const table = $('det');

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < table.length; i++) {
        const product = table.eq(i);

        const name = product.find('xProd').eq(0).html();
        const price = product.find('vUnCom').eq(0).html();
        const qty = product.find('qCom').eq(0).html();
        const measure = product.find('uCom').eq(0).html();
        // const category = product.find('xProd').eq(0);

        if (name && price && qty && measure) {
          const existProduct = products.findIndex((item) => item.name === name);
          const qtyFormatted = parseFloat(qty);

          if (existProduct >= 0) {
            products[existProduct].qty = qtyFormatted + products[existProduct].qty;
          } else {
            products.push({
              name,
              price,
              qty: qtyFormatted,
              measure: measure.toLowerCase() as Measure,
              fair,
              bought: true,
            });
          }
          console.log('PRODUCT', { name, price, qty, measure: measure.toLowerCase() as Measure });
        }
      }

      await FairProduct.insertMany(products);
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();

  return response.noContent();
};
