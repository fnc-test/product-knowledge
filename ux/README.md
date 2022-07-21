# Catena-X Knowledge Agents (Hey Catena!) User Experience Sources

This is a folder linking all the codes related to the Hey Catena! (CX Knowledge Agents) User Experience product.

It consists of 
- [Skill Framework](skill_framework) library to build Apps that interact with Hey Catena! and keep conversational state.
- [Knowledge Explorer](knowledge_explorer) a set of UI components which allow an ad-hoc and speech-oriented interaction with Hey Catena! The Knowledge Explorer uses the Skill Framework.
- [Skill Gym](skill_gym) a set of UI components which allow to define and test new skills for Hey Catena! The Skill Gym uses the Skill Framework and the Knowledge Explorer

## Notice

* see copyright notice in the top folder
* see license file in the top folder
* see authors file in the top folder

## Setup as a monorepo

The CX KA UX is built in node/typescript.
The UI part is built using react.
The testing is done via jest.

* See [this guide](https://javascript.plainenglish.io/monorepo-setup-with-npm-and-typescript-90b329ba7275) on how we setup 
node in this folder.

* See [this guide](https://www.testim.io/blog/typescript-unit-testing-101/) on how we setup jest in this folder.

For initialisation, you will need to run

```
npm install -g jest
npm install typescript
npm install
```

