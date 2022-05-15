const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('BordersParser ', () => {
  describe('Testing BordersParser parser when parsing data string provided by BordersGuy', () => {
    const BordersParser = require('../lib/content/general/infrastructure/parsers/BordersParser');
    it('should provide parsed borders report, when string is in the predicted format', async () => {
      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">	<title>Stanje na cestah - Dogodki</title>	<subtitle>Dogodki</subtitle>	<updated>2021-04-25T13:28:41.307Z</updated>	<link href="http://www.promet.si" />	<author>		<name>DARS d.d.</name>		<email>info@promet.si</email>	</author>	<id>urn:uuid:9a35007f-a078-4318-ad31-26189029f68a</id>	<entry>		<title>G1-6 Ilirska Bistrica - Jelšane: Zastoj</title>		<id>tag:promet.si,2000:/_archives/dogodki/510510</id>		<updated>2021-04-25T13:28:28.247Z</updated>		<content>G1-6, mejni prehod Jelšane, Rupa, čakalne dobe: osebna vozila 45 min pri vstopu.</content>		<category term="Zastoj" />	</entry>	<entry>		<title>A2 Obrežje - Brežice: Zastoj</title>		<id>tag:promet.si,2000:/_archives/dogodki/510507</id>		<updated>2021-04-25T13:28:41.307Z</updated>		<content>A2, mejni prehod Obrežje, Bregana, čakalne dobe: osebna vozila 1 h pri vstopu.</content>		<category term="Zastoj" />	</entry>	<entry>		<title>A4 Gruškovje - Podlehnik: Zastoj</title>		<id>tag:promet.si,2000:/_archives/dogodki/510506</id>		<updated>2021-04-25T11:27:33.343Z</updated>		<content>A4, mejni prehod Gruškovje, Macelj, čakalne dobe: osebna vozila 30 min pri vstopu.</content>		<category term="Zastoj" />	</entry></feed>';
      const expectedResult = {
        title: 'Stanje na cestah - Dogodki',
        dateUpdated: '2021-04-25T13:28:41.307Z',
        items: [
          {
            title: 'Zastoj v Ilirska',
            roadSection: 'G1-6',
            location: 'Ilirska',
            category: 'Zastoj',
            description:
              'G1-6, mejni prehod Jelšane, Rupa, čakalne dobe: osebna vozila 45 min pri vstopu.',
            datePublished: '2021-04-25T13:28:28.247Z'
          },
          {
            title: 'Zastoj v Obrežje',
            roadSection: 'A2',
            location: 'Obrežje',
            category: 'Zastoj',
            description:
              'A2, mejni prehod Obrežje, Bregana, čakalne dobe: osebna vozila 1 h pri vstopu.',
            datePublished: '2021-04-25T13:28:41.307Z'
          },
          {
            title: 'Zastoj v Gruškovje',
            roadSection: 'A4',
            location: 'Gruškovje',
            category: 'Zastoj',
            description:
              'A4, mejni prehod Gruškovje, Macelj, čakalne dobe: osebna vozila 30 min pri vstopu.',
            datePublished: '2021-04-25T11:27:33.343Z'
          }
        ]
      };

      const actualResult = await BordersParser(data);

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('should provide a corresponding error message, when data string is empty or otherwise incorrect.', async () => {
      const data = '';
      const expectedResult = {
        error: 'Parsing error; No result from parsing.'
      };

      const actualResult = await BordersParser(data);

      expect(actualResult).to.contain(expectedResult);
    });

    it('should provide a corresponding error message, when data string does not contain main attributes', async () => {
      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">  	<subtitle>Dogodki</subtitle>  	<updated>2021-02-10T15:10:36.287Z</updated>  	<link href="http://www.promet.si" />  	<author>    		<name>DARS d.d.</name>    		<email>info@promet.si</email>  	</author>  	<id>urn:uuid:da7e75e1-05fc-4b93-b27d-8688547dc13a</id>  	<entry>    		<title>A1-E57, E59, Maribor - Šentilj: Zastoj</title>    		<id>tag:promet.si,2000:/_archives/dogodki/493170</id>    		<updated>2021-02-10T15:01:12.59Z</updated>    		<content>A1, Maribor - Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km.</content>    		<category term="Zastoj" />  	</entry>  	<entry>    		<title>A1-E57, Ljubljana - Maribor: Zastoj</title>    		<id>tag:promet.si,2000:/_archives/dogodki/493169</id>    		<updated>2021-02-10T15:10:36.287Z</updated>    		<content>A1, Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km.</content>    		<category term="Zastoj" />  	</entry></feed>';
      const expectedResult = { error: 'Parsing error; Attributes not found.' };

      const actualResult = await BordersParser(data);

      expect(actualResult).to.contain(expectedResult);
    });

    it('should provide only main attributes, when data string is does not include any road event entries.', async () => {
      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">	<title>Stanje na cestah - Dogodki</title>	<subtitle>Dogodki</subtitle>	<updated>2021-04-25T13:28:41.307Z</updated>	<link href="http://www.promet.si" />	<author>		<name>DARS d.d.</name>		<email>info@promet.si</email>	</author>	<id>urn:uuid:9a35007f-a078-4318-ad31-26189029f68a</id></feed>';
      const expectedResult = { providedInput: data };

      const actualResult = await BordersParser(data);

      expect(actualResult).to.contain(expectedResult);
    });

    it('should provide a corresponding error message for each entry failing to parse, along with the entry itself in its raw form', async () => {
      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">  	<title>Stanje na cestah - Dogodki, 10. 02. 2021 16:11:28</title>  	<subtitle>Dogodki</subtitle>  	<updated>2021-02-10T15:10:36.287Z</updated>  	<link href="http://www.promet.si" />  	<author>    		<name>DARS d.d.</name>    		<email>info@promet.si</email>  	</author>  	<id>urn:uuid:da7e75e1-05fc-4b93-b27d-8688547dc13a</id>  	<entry>    		<title></title>    		<id>tag:promet.si,2000:/_archives/dogodki/493170</id>    		<updated>2021-02-10T15:01:12.59Z</updated>    		<content>A1, Maribor - Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km.</content>    		<category term="Zastoj" />  	</entry>  	<entry>    		<title></title>    		<id>tag:promet.si,2000:/_archives/dogodki/493169</id>    		<updated>2021-02-10T15:10:36.287Z</updated>    		<content>A1, Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km.</content>    		<category term="Zastoj" />  	</entry></feed>';
      const expectedResult = {
        title: 'Stanje na cestah - Dogodki, 10. 02. 2021 16:11:28',
        dateUpdated: '2021-02-10T15:10:36.287Z',
        items: [
          {
            error: true,
            data: '{"title":[""],"id":["tag:promet.si,2000:/_archives/dogodki/493170"],"updated":["2021-02-10T15:01:12.59Z"],"content":["A1, Maribor - Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km."],"category":[{"$":{"term":"Zastoj"}}]}',
            message: 'Parsing error; Entry not parsable.'
          },
          {
            error: true,
            data: '{"title":[""],"id":["tag:promet.si,2000:/_archives/dogodki/493169"],"updated":["2021-02-10T15:10:36.287Z"],"content":["A1, Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km."],"category":[{"$":{"term":"Zastoj"}}]}',
            message: 'Parsing error; Entry not parsable.'
          }
        ]
      };

      const actualResult = await BordersParser(data);

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
