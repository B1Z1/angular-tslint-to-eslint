# Migration guide from tslint to eslint

In this guide I'll try to show how to migrate from tslint to eslint. Firstly I'll migrate simple tslint rules to eslint.
After that I'll migrate custom tslint to eslint or show how you can use tslint rules in eslint project without rewrite
them.

## Automatic migration

Easy way to migrate tslint to eslint is to add some packages and execute some terminal magic commands. It is angular
official migration commends, you can learn more here: https://github.com/angular-eslint/angular-eslint

1. Add package to your project:

```shell
ng add @angular-eslint/schematics
```

2. After you need to execute this command:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint your_project_name
```

After it, you will see new .eslint.json file with **some** of migrated rules. Yea, here is one little problem, not all
rules are migrated to eslint. For example "no-console" with custom configuration or our custom rule "
class-name-pascal-case". If it's ok for you, you can remove tslint.json and be proud of yourself. But if you want to
have all rules inside eslint, we must go another way.

## Pseudo automatic migration

Here we will try another approach. It is not official solution, but has own pros. The full guide in link
below: https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration

1. Execute command:

```shell
npx tslint-to-eslint-config
```

You only need to have installed npx in your local machine. After execution script will generate new file .eslintrc.js.
And yes, here is some problems:

1. No auto replace inside your project. All your exceptions don't replaced to eslint convention
2. No auto package installation. You need to install all packages manually
3. Your eslint configuration file is too big

But here is good news. Our custom rule is places at the bottom of file:

```
"@typescript-eslint/tslint/config":
[
  "error",
  {
    "rules": {
      "class-name-pascal-case": true,
      "import-spacing": true,
      "whitespace": [
        true,
        "check-branch",
        "check-decl",
        "check-operator",
        "check-separator",
        "check-type",
        "check-typecast"
      ]
    }
  }
]
```

## Combine two of them

As you see, here is a problem with both of them. First approach do not migrate properly all rules, but replace all
exclusions and automatically install all packages. Second approach migrates all rules, but in "stupid" way, without any
replacement and automatic download. And here is my approach, you can use two approaches and combine them into one:

1. Add package to your project:

```shell
ng add @angular-eslint/schematics
```

This will automatically download all necessary packages for migration

2. Execute this command:

```shell
ng g @angular-eslint/schematics:convert-tslint-to-eslint your_project_name
```

After it all your exceptions will be changed from tslint to eslint, script will generate your .eslintrc.json file and
all necessary packages will download.

3. Execute next command:

```shell
npx tslint-to-eslint-config
```

And yes, after it, you'll see .eslintrc.js with the longest content. But here you'll have all your rules, without any
missed exceptions.

4. Compare them. From my experience, better migrate all unnecessary rules from .eslintrc.js to .eslintrc.json.

For grief there is no full automation tool, that will do everything you want without your engagement.

I hope that my article help you to consider which method is better. If you have your own solutions, you can contact me,
and we will change it :D
