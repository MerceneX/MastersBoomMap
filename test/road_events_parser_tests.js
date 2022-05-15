const expect = require('chai').expect;
describe('RoadEventsParser', () => {
  describe('Testing road-events parser when parsing data string provided by RoadEventsGuy', () => {
    const RoadEventsParser = require('../lib/content/general/infrastructure/parsers/RoadEventsParser');
    it('should provide parsed road events, when string is in the predicted format', async () => {
      /*const expectedResult = {  // TO BE
				title: 'Stanje na cestah - Dogodki, 10. 02. 2021 16:11:28',
				dateUpdated: '2021-02-10T15:10:36.287Z',
				items: [
					{
						title: 'Zastoj v Maribor - Šentilj',
						roadSection: 'A1-E57',
						location: 'A1-E57, E59',
						category: 'Zastoj',
						description: 'Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km.',
						datePublished: '2021-02-10T15:01:12.59Z'
					},
					{
						title: 'Zastoj v Ljubljana - Maribor',
						roadSection: 'A1-E57',
						location: 'Ljubljana - Maribor',
						category: 'Zastoj',
						description: 'Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km.',
						datePublished: '2021-02-10T15:10:36.287Z'
					}
				]
			}*/

      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">  <title>Stanje na cestah - Dogodki, 10. 02. 2021 16:11:28</title>  <subtitle>Dogodki</subtitle>  <updated>2021-02-10T15:10:36.287Z</updated>  <link href="http://www.promet.si" />  <author>    <name>DARS d.d.</name>    <email>info@promet.si</email>  </author>  <id>urn:uuid:da7e75e1-05fc-4b93-b27d-8688547dc13a</id>  <entry>    <title>A1-E57, E59, Maribor - Šentilj: Zastoj</title>    <id>tag:promet.si,2000:/_archives/dogodki/493170</id>    <updated>2021-02-10T15:01:12.59Z</updated>    <content>A1, Maribor - Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km.</content>    <category term="Zastoj" />  </entry>  <entry>    <title>A1-E57, Ljubljana - Maribor: Zastoj</title>    <id>tag:promet.si,2000:/_archives/dogodki/493169</id>    <updated>2021-02-10T15:10:36.287Z</updated>    <content>A1, Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km.</content>    <category term="Zastoj" />  </entry></feed>';
      const expectedResult = {
        title: 'Stanje na cestah - Dogodki, 10. 02. 2021 16:11:28',
        dateUpdated: '2021-02-10T15:10:36.287Z',
        items: [
          {
            title: 'Zastoj v Maribor - Šentilj',
            roadSection: 'A1-E57, E59',
            location: 'Maribor - Šentilj',
            category: 'Zastoj',
            description:
              'A1, Maribor - Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km.',
            datePublished: '2021-02-10T15:01:12.59Z'
          },
          {
            title: 'Zastoj v Ljubljana - Maribor',
            roadSection: 'A1-E57',
            location: 'Ljubljana - Maribor',
            category: 'Zastoj',
            description:
              'A1, Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km.',
            datePublished: '2021-02-10T15:10:36.287Z'
          }
        ]
      };

      const actualResult = await RoadEventsParser(data);

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('should provide a corresponding error message, when data string is empty or otherwise incorrect.', async () => {
      const data = '';
      const expectedResult = {
        error: 'Parsing error; No result from parsing.'
      };

      const actualResult = await RoadEventsParser(data);

      expect(actualResult).to.contain(expectedResult);
    });

    it('should provide a corresponding error message, when data string does not contain main attributes', async () => {
      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">  	<subtitle>Dogodki</subtitle>  	<updated>2021-02-10T15:10:36.287Z</updated>  	<link href="http://www.promet.si" />  	<author>    		<name>DARS d.d.</name>    		<email>info@promet.si</email>  	</author>  	<id>urn:uuid:da7e75e1-05fc-4b93-b27d-8688547dc13a</id>  	<entry>    		<title>A1-E57, E59, Maribor - Šentilj: Zastoj</title>    		<id>tag:promet.si,2000:/_archives/dogodki/493170</id>    		<updated>2021-02-10T15:01:12.59Z</updated>    		<content>A1, Maribor - Šentilj, krožišče Pesnica - priključek Šentilj v smeri Šentilja, Avstrije, zastoj tovornih vozil, dolžina: 2 km.</content>    		<category term="Zastoj" />  	</entry>  	<entry>    		<title>A1-E57, Ljubljana - Maribor: Zastoj</title>    		<id>tag:promet.si,2000:/_archives/dogodki/493169</id>    		<updated>2021-02-10T15:10:36.287Z</updated>    		<content>A1, Ljubljana - Maribor, uvoz Ljubljana Šentjakob - priključek Domžale v smeri Celja, območje zastojev, zamuda: 5 min, dolžina: 4 km.</content>    		<category term="Zastoj" />  	</entry></feed>';
      const expectedResult = { error: 'Parsing error; Attributes not found.' };

      const actualResult = await RoadEventsParser(data);

      expect(actualResult).to.contain(expectedResult);
    });

    it('should provide only main attributes, when data string is does not include any road event entries.', async () => {
      const data =
        '<feed xmlns:kazipot="http://www.promet.si" xmlns="http://www.w3.org/2005/Atom">  	<title>Stanje na cestah - Dogodki, 10. 02. 2021 16:11:28</title>  	<subtitle>Dogodki</subtitle>  	<updated>2021-02-10T15:10:36.287Z</updated>  	<link href="http://www.promet.si" />  	<author>    		<name>DARS d.d.</name>    		<email>info@promet.si</email>  	</author>  	<id>urn:uuid:da7e75e1-05fc-4b93-b27d-8688547dc13a</id>  </feed>';
      const expectedResult = { providedInput: data };

      const actualResult = await RoadEventsParser(data);

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

      const actualResult = await RoadEventsParser(data);

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
