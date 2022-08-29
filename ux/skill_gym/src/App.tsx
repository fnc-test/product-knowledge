import { AssetView } from "@catenax-ng/skill-modules";
import {getConnectorFactory} from '@knowledge-agents-ux/skill_framework/dist/src';

export default function App(){
  const connector = getConnectorFactory().create();
  connector.listAssets().then(r => console.log(r))

  return(
    <AssetView />
  )
}