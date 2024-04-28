/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog';
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { abi } from './abi';
import type { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import css from 'styled-jsx/css';

const app = new Frog({
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/posting/beggar', (c) => {
  const {initialPath, inputText} = c;
  const params = initialPath.split('/');

  if (!inputText) {
    return new Response('Must include a wallet address', { status: 400 })
  }

  return c.res({
    image: 'https://i.imgur.com/GIuavK8.gif',
    intents: [
      <Button.Link href={`https://warpcast.com/~/compose?embeds%5B%5D=https%3A%2F%2Fbasebeg.com%2Fapi%2F${inputText}%0A`}>POST YOUR BEGGAR FRAME</Button.Link>,
      <Button.Reset>CANCEL</Button.Reset>
    ],
  });
});

app.frame('/:address', (c) => {
  
  if (c.buttonValue === 'genbeggar') {
    return c.res({
      image: 'https://i.imgur.com/GIuavK8.gif',
      intents: [
        <TextInput placeholder={'Your wallet address...'}/>,
        <Button action='/posting/beggar'>GENERATE YOUR BEGGAR FRAME</Button>,
        <Button.Reset>CANCEL</Button.Reset>
      ],
    });
  } else {
    return c.res({
      image: 'https://i.imgur.com/GIuavK8.gif',
      intents: [
        <TextInput placeholder={`Donation Amount (ETH) > 0`}/>,
        <Button.Transaction action='/finish/beg' target={`/${c.req.param('address')}/donate`}>DONATE TO THE BEGGAR</Button.Transaction>,
        <Button value={'genbeggar'}>GET YOUR BEGGAR FRAME</Button>
      ],
    });
  }

});

app.frame('/finish/beg', (c) => {
  const params = c.initialPath.split('/');
  return c.res({
    image: 'https://i.imgur.com/FUoMZLX.gif',
    intents: [
      <Button.Reset>DONATE MORE MONEY</Button.Reset>,
      <Button action='/generate/beggar'>GET YOUR BEGGAR FRAME</Button>
    ]
  })
});

app.transaction('/:address/donate', (c) => {
  const { inputText, req } = c
  const address = req.param('address') as Address;

  if (!inputText) {
    return new Response('Please input a desired donation amount', { status: 400 })
  }

  return c.contract({
    abi,
    functionName: 'donate',
    args: [address],
    chainId: `eip155:${base.id}`,
    to: '0xE68538bcD77DF90A6CB466c5611603A829fAFd22',
    value: parseEther(inputText)
  });
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
