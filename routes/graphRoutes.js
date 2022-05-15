const express = require('express'),
  router = express.Router({ mergeParams: true }),
  QueryMan = require('../lib/queries'),
  valesAndCodes = require('../lib/values');

router.get('/23', async (req, res) => {
  // N/A
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph23.id);
  res.json(queryMan.data);
});

router.get('/24', async (req, res) => {
  // N/A
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph24.id);
  res.json(queryMan.data);
});

router.get('/25', async (req, res) => {
  //PRVR
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph25.id);
  res.json(queryMan.data);
});

router.get('/26', async (req, res) => {
  //PRVZ
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph26.id);
  res.json(queryMan.data);
});

router.get('/27', async (req, res) => {
  //LVZN
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph27.id);
  res.json(queryMan.data);
});

router.get('/28', async (req, res) => {
  //PRVU
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph28.id);
  res.json(queryMan.data);
});
router.get('/29', async (req, res) => {
  //N/A
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph29.id);
  res.json(queryMan.data);
});

router.get('/30', async (req, res) => {
  //PRTN
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph30.id);
  res.json(queryMan.data);
});

router.get('/31', async (req, res) => {
  //PRSP
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph31.id);
  res.json(queryMan.data);
});

router.get('/32', async (req, res) => {
  //LOVC
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph32.id);
  res.json(queryMan.data);
});

router.get('/33', async (req, res) => {
  //N/A
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph33.id);
  res.json(queryMan.data);
});

router.get('/34', async (req, res) => {
  //PRPO
  const queryMan = await QueryMan.getQueryMan(valesAndCodes.graph34.id);
  res.json(queryMan.data);
});

router.get('/35', async (req, res) => {
  //N/A
  let result;
  if (result) res.json(result);
  else {
    result = {
      naslov: 'Intenzivnosti poškodb v nedeljo',
      podatki: [
        {
          intenzivnost: 'BREZ POŠKODBE',
          nesrece:
            (await QueryMan.customQuery(
              'nesrece',
              ['dan_v_tednu', 'PRPO_poskodbe'],
              ['6w', 'B']
            )) +
            (await QueryMan.customQuery(
              'nesrece',
              ['dan_v_tednu', 'PRPO_poskodbe'],
              ['6w', 'U']
            ))
        },
        {
          intenzivnost: 'HUDA TELESNA POŠKODBA',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['dan_v_tednu', 'PRPO_poskodbe'],
            ['6w', 'H']
          )
        },
        {
          intenzivnost: 'LAŽJA TELESNA POŠKODBA',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['dan_v_tednu', 'PRPO_poskodbe'],
            ['6w', 'L']
          )
        },
        {
          intenzivnost: 'SMRT',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['dan_v_tednu', 'PRPO_poskodbe'],
            ['6w', 'S']
          )
        }
      ]
    };
    res.json(result);
  }
});

router.get('/36', async (req, res) => {
  //N/A
  let result;
  if (result) res.json(result);
  else {
    result = {
      naslov: 'Intenzivnosti poškodb med prazniki',
      podatki: [
        {
          intenzivnost: 'BREZ POŠKODBE',
          nesrece:
            (await QueryMan.customQuery(
              'nesrece',
              ['je_praznik', 'PRPO_poskodbe'],
              [true, 'B']
            )) +
            (await QueryMan.customQuery(
              'nesrece',
              ['je_praznik', 'PRPO_poskodbe'],
              [true, 'U']
            ))
        },
        {
          intenzivnost: 'HUDA TELESNA POŠKODBA',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['je_praznik', 'PRPO_poskodbe'],
            [true, 'H']
          )
        },
        {
          intenzivnost: 'LAŽJA TELESNA POŠKODBA',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['je_praznik', 'PRPO_poskodbe'],
            [true, 'L']
          )
        },
        {
          intenzivnost: 'SMRT',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['je_praznik', 'PRPO_poskodbe'],
            [true, 'S']
          )
        }
      ]
    };
    res.json(result);
  }
});

router.get('/37', async (req, res) => {
  //N/A
  let result;
  if (result) res.json(result);
  else {
    result = {
      naslov: 'Najbolj smrtonosni tip trčenja',
      podatki: [
        {
          intenzivnost: 'BOČNO TRČENJE',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['BT', 'S']
          )
        },
        {
          intenzivnost: 'ČELNO TRČENJE',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['�T', 'S']
          )
        },
        {
          intenzivnost: 'NALETNO TRČENJE',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['NT', 'S']
          )
        },
        {
          intenzivnost: 'OPLAŽENJE',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['OP', 'S']
          )
        },
        {
          intenzivnost: 'OSTALO',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['OS', 'S']
          )
        },
        {
          intenzivnost: 'POVOŽENJE PEŠCA',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['PP', 'S']
          )
        },
        {
          intenzivnost: 'PREVRNITEV VOZILA',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['PR', 'S']
          )
        },
        {
          intenzivnost: 'POVOŽENJE ŽIVALI',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['PZ', 'S']
          )
        },
        {
          intenzivnost: 'TRČENJE V OBJEKT',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['TO', 'S']
          )
        },
        {
          intenzivnost: 'TRČENJE V STOJEČE / PARKIRANO VOZILO',
          nesrece: await QueryMan.customQuery(
            'nesrece',
            ['PRPV_Tip_Nesrece', 'PRPO_poskodbe'],
            ['TV', 'S']
          )
        }
      ]
    };
    res.json(result);
  }
});
module.exports = router;
