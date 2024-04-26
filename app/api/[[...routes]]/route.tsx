/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog';
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { abi } from './abi';
import type { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

const app = new Frog({
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/:address', (c) => {
  return c.res({
    action: `/finish/beg`,
    image: 'https://i.imgur.com/GIuavK8.gif',
    intents: [
      <TextInput placeholder={`Donation Amount (ETH) > 0`}/>,
      <Button.Transaction target={`/${c.req.param('address')}/donate`}>DONATE TO THE BEGGAR</Button.Transaction>,
    ],
  });
});

app.frame('/finish/beg', (c) => {
  const params = c.initialPath.split('/');
  return c.res({
    image: 'https://i.imgur.com/FUoMZLX.gif',
    intents: [
      <Button action={`/${params[2]}`}>DONATE MORE MONEY</Button>
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
