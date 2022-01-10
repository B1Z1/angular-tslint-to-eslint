# Migration guide from tslint to eslint

In this guide I'll try to show how to migrate from tslint to eslint. 
Firstly I'll migrate simple tslint rules to eslint. After that I'll 
migrate custom tslint to eslint or show how you can use tslint rules
in eslint project without rewrite them.

## Automatic migration

Easy way to migrate tslint to eslint is to add some packages and execute
some terminal magic commands.

1. Add package to your project: 

```shell
ng add @angular-eslint/schematics
```

2. After you need to execute this command:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint your_project_name
```

Note: After it, you will see new .eslint.json file with **some** of migrated 
rules. Yea, here is one little problem, not all rules are migrated to eslint. 
For example "no-console" with custom configuration. If it's ok for you, you can
remove tslint.json and be proud of yourself. But if you want to have all rules
inside eslint, we must go another way. 
