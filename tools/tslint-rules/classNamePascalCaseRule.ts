import * as Lint from 'tslint';
import * as ts from 'typescript';
import * as tsutils from 'tsutils';

function isUpperCase(str) {
  return str === str.toUpperCase();
}

function isPascalCased(name) {
  return isUpperCase(name[0]) && !name.includes('_') && !name.includes('-');
}

export class Rule extends Lint.Rules.AbstractRule {

  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'class-name-pascal-case',
    description: 'Enforces PascalCased class and interface names.',
    optionsDescription: 'Not configurable.',
    options: null,
    type: 'style',
    typescriptOnly: false
  };

  public static FAILURE_STRING = 'Class name must be in pascal case!!';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new ClassNamePascalCaseWalker(sourceFile, Rule.metadata.ruleName, void this.getOptions()));
  }
}

class ClassNamePascalCaseWalker extends Lint.AbstractWalker {
  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node): void => {
      if ((tsutils.isClassLikeDeclaration(node) && node.name !== undefined) ||
        tsutils.isInterfaceDeclaration(node)) {
        if (!isPascalCased(node.name.text)) {
          this.addFailureAtNode(node.name, Rule.FAILURE_STRING);
        }
      }
      return ts.forEachChild(node, cb);
    };

    return ts.forEachChild(sourceFile, cb);
  }
}
