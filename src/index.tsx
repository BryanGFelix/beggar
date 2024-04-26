import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/vercel'
import { abi as  ethAbi} from './abi/EthBegger';
import { pinata } from 'frog/hubs';
import { baseSepolia } from 'viem/chains';
import type { Address } from 'viem'

export const app = new Frog({
  basePath: '/',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
})

app.frame('/:address', (c) => {
  return c.res({
    action: `/finish/beg`,
    image: 'https://i.imgur.com/GIuavK8.gif',
    intents: [
      <TextInput placeholder={`Donation Amount (ETH)`}/>,
      <Button.Transaction target={`/${c.req.param('address')}/donate`}>DONATE TO THE BEGGAR</Button.Transaction>,
    ],
  });
});

app.frame('/finish/beg', (c) => {
  return c.res({
    action: c.initialPath,
    image: 'https://i.imgur.com/FUoMZLX.gif',
    intents: [
      <Button>DONATE MORE MONEY</Button>
    ]
  })
});

app.transaction('/:address/donate', (c) => {
  const { inputText, req } = c
  const address = req.param('address') as Address;

  return c.contract({
    abi: ethAbi,
    functionName: 'donate',
    args: [address],
    chainId: `eip155:${baseSepolia.id}`,
    to: '0x72b1B5E1C1662fD726538DA14C928669093b9Ef5',
    value: parseEther(inputText)
  });
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)