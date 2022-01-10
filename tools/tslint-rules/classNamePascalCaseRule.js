"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var tsutils = require("tsutils");
function isUpperCase(str) {
    return str === str.toUpperCase();
}
function isPascalCased(name) {
    return isUpperCase(name[0]) && !name.includes('_') && !name.includes('-');
}
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ClassNamePascalCaseWalker(sourceFile, Rule.metadata.ruleName, void this.getOptions()));
    };
    Rule.metadata = {
        ruleName: 'class-name-pascal-case',
        description: 'Enforces PascalCased class and interface names.',
        optionsDescription: 'Not configurable.',
        options: null,
        type: 'style',
        typescriptOnly: false
    };
    Rule.FAILURE_STRING = 'Class name must be in pascal case!!';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ClassNamePascalCaseWalker = /** @class */ (function (_super) {
    __extends(ClassNamePascalCaseWalker, _super);
    function ClassNamePascalCaseWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassNamePascalCaseWalker.prototype.walk = function (sourceFile) {
        var _this = this;
        var cb = function (node) {
            if ((tsutils.isClassLikeDeclaration(node) && node.name !== undefined) ||
                tsutils.isInterfaceDeclaration(node)) {
                if (!isPascalCased(node.name.text)) {
                    _this.addFailureAtNode(node.name, Rule.FAILURE_STRING);
                }
            }
            return ts.forEachChild(node, cb);
        };
        return ts.forEachChild(sourceFile, cb);
    };
    return ClassNamePascalCaseWalker;
}(Lint.AbstractWalker));
