export declare namespace Myna {
    class ParserError extends Error {
        type: string;
        constructor(message?: string);
    }
    const grammars: {};
    const allRules: {};
    const parsers: {};
    class ParseLocation {
        input: string;
        index: number;
        lineNum: number;
        colNum: number;
        lineStart: number;
        lineEnd: number;
        lineText: string;
        pointerText: string;
        constructor(input: string, index: number);
        toString(): string;
    }
    class ParseState {
        input: string;
        index: number;
        nodes: AstNode[];
        length: number;
        rules: AstRule[];
        constructor(input: string, index: number, nodes: AstNode[]);
        readonly location: ParseLocation;
    }
    type RuleType = Rule | string | boolean;
    class AstNode {
        rule: Rule;
        input: string;
        start: number;
        end: number;
        children: AstNode[];
        constructor(rule: Rule, input: string, start?: number, end?: number);
        readonly name: string;
        readonly fullName: string;
        readonly allText: string;
        readonly isLeaf: boolean;
        child(name: string): AstNode;
        readonly _firstChildStart: number;
        readonly _lastChildEnd: number;
        readonly beforeChildrenText: string;
        readonly afterChildrenText: string;
        readonly allChildrenText: string;
        toString(): string;
    }
    class Rule {
        rules: Rule[];
        name: string;
        grammarName: string;
        type: string;
        className: string;
        _createAstNode: boolean;
        parser: (ParseState: any) => boolean;
        lexer: (ParseState: any) => boolean;
        node(text?: string, ...children: any[]): AstNode;
        parse(s: string): AstNode;
        constructor(rules: Rule[]);
        setName(grammarName: string, ruleName: string): Rule;
        readonly definition: string;
        readonly fullName: string;
        readonly nameOrDefinition: string;
        toString(): string;
        readonly firstChild: Rule;
        setType(type: string): Rule;
        cloneImplementation(): Rule;
        readonly copy: Rule;
        readonly hasAstChildRule: boolean;
        readonly createsAstNode: boolean;
        readonly nonAdvancing: boolean;
        astRuleDefn(inSeq?: boolean, inChoice?: boolean): string;
        astRuleNameOrDefn(inSeq?: boolean, inChoice?: boolean): string;
        readonly opt: Rule;
        readonly zeroOrMore: Rule;
        readonly oneOrMore: Rule;
        readonly at: Rule;
        readonly not: Rule;
        readonly advance: Rule;
        readonly ws: Rule;
        readonly all: Rule;
        readonly end: Rule;
        readonly assert: Rule;
        readonly ast: Rule;
        then(r: RuleType): Rule;
        thenAt(r: RuleType): Rule;
        thenNot(r: RuleType): Rule;
        or(r: RuleType): Rule;
        until(r: RuleType): Rule;
        untilPast(r: RuleType): Rule;
        repeat(count: number): Rule;
        quantified(min: number, max: number): Rule;
        delimited(delimiter: RuleType): Rule;
        unless(r: RuleType): Rule;
    }
    class AstRule extends Rule {
        r: Rule;
        type: string;
        className: string;
        constructor(r: Rule);
    }
    class Sequence extends Rule {
        rule1: Rule;
        rule2: Rule;
        type: string;
        className: string;
        constructor(rule1: Rule, rule2: Rule);
        readonly definition: string;
        readonly nonAdvancing: boolean;
        readonly createsAstNode: boolean;
        cloneImplementation(): Rule;
    }
    class Choice extends Rule {
        rule1: Rule;
        rule2: Rule;
        type: string;
        className: string;
        constructor(rule1: Rule, rule2: Rule);
        readonly definition: string;
        readonly nonAdvancing: boolean;
        readonly createsAstNode: boolean;
        cloneImplementation(): Rule;
    }
    class Quantified extends Rule {
        min: number;
        max: number;
        type: string;
        className: string;
        constructor(rule: Rule, min?: number, max?: number);
        readonly definition: string;
        readonly createsAstNode: boolean;
        cloneImplementation(): Rule;
    }
    class Optional extends Quantified {
        type: string;
        className: string;
        constructor(rule: Rule);
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class Advance extends Rule {
        type: string;
        className: string;
        constructor();
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class AdvanceIf extends Rule {
        type: string;
        className: string;
        constructor(condition: Rule);
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class Text extends Rule {
        text: string;
        type: string;
        className: string;
        constructor(text: string);
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class AnyCaseText extends Rule {
        text: string;
        type: string;
        className: string;
        constructor(text: string);
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class Delay extends Rule {
        fn: () => Rule;
        type: string;
        className: string;
        constructor(fn: () => Rule);
        cloneImplementation(): Rule;
        readonly definition: string;
        readonly createsAstNode: boolean;
    }
    class NonAdvancingRule extends Rule {
        type: string;
        constructor(rules: Rule[]);
        readonly nonAdvancing: boolean;
    }
    class CharSet extends NonAdvancingRule {
        chars: string;
        type: string;
        className: string;
        constructor(chars: string);
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class CharRange extends NonAdvancingRule {
        min: string;
        max: string;
        type: string;
        className: string;
        constructor(min: string, max: string);
        readonly definition: string;
        cloneImplementation(): Rule;
    }
    class Not extends NonAdvancingRule {
        type: string;
        className: string;
        constructor(rule: Rule);
        cloneImplementation(): Rule;
        readonly definition: string;
    }
    class At extends NonAdvancingRule {
        type: string;
        className: string;
        constructor(rule: Rule);
        cloneImplementation(): Rule;
        readonly definition: string;
    }
    class Predicate extends NonAdvancingRule {
        fn: (p: ParseState) => boolean;
        type: string;
        className: string;
        constructor(fn: (p: ParseState) => boolean);
        cloneImplementation(): Rule;
        readonly definition: string;
    }
    function text(text: string): Text;
    function textAnyCase(text: string): AnyCaseText;
    function seq(...rules: RuleType[]): any;
    function choice(...rules: RuleType[]): any;
    function delay(fxn: () => Rule): Delay;
    function not(rule: RuleType): Not;
    function at(rule: RuleType): At;
    function quantified(rule: RuleType, min?: number, max?: number): Quantified;
    function zeroOrMore(rule: RuleType): Rule;
    function oneOrMore(rule: RuleType): Rule;
    function opt(rule: RuleType): Rule;
    function repeat(rule: RuleType, count: number): Rule;
    function atChar(chars: string): CharSet;
    function notAtChar(chars: string): Rule;
    function char(chars: string): Rule;
    function notChar(chars: string): Rule;
    function atRange(min: string, max: string): CharRange;
    function range(min: string, max: string): Rule;
    function notRange(min: string, max: string): Rule;
    function delimited(rule: RuleType, delimiter: RuleType): Rule;
    function unless(rule: RuleType, condition: RuleType): any;
    function repeatWhileNot(body: RuleType, condition: RuleType): any;
    function repeatOneOrMoreWhileNot(body: RuleType, condition: RuleType): Rule;
    function repeatUntilPast(body: RuleType, condition: RuleType): any;
    function repeatOneOrMoreUntilPast(body: RuleType, condition: RuleType): Rule;
    function advanceWhileNot(rule: RuleType): any;
    function advanceOneOrMoreWhileNot(rule: RuleType): Rule;
    function advanceUntilPast(rule: RuleType): any;
    function advanceOneOrMoreUntilPast(rule: RuleType): Rule;
    function advanceUnless(rule: RuleType): Rule;
    function predicate(fn: (p: ParseState) => boolean): Predicate;
    function action(fn: (p: ParseState) => void): Rule;
    function log(msg?: string): Rule;
    function err(message: any): Rule;
    function assert(rule: RuleType): any;
    function guardedSeq(condition: RuleType, ...rules: RuleType[]): any;
    function doubleQuoted(rule: RuleType): any;
    function doubleQuotedString(escape: RuleType): any;
    function singleQuoted(rule: RuleType): any;
    function singleQuotedString(escape: RuleType): any;
    function parenthesized(rule: RuleType): any;
    function braced(rule: RuleType): any;
    function bracketed(rule: RuleType): any;
    function tagged(rule: RuleType): any;
    function keyword(text: string): any;
    function keywordAnyCase(text: string): any;
    function keywords(...words: string[]): any;
    const truePredicate: Predicate;
    const falsePredicate: Predicate;
    const end: Predicate;
    const notEnd: Predicate;
    const advance: Advance;
    const all: Rule;
    const atLetterLower: CharRange;
    const atLetterUpper: CharRange;
    const atLetter: any;
    const atDigit: CharRange;
    const atDigitNonZero: CharRange;
    const atHexDigit: any;
    const atBinaryDigit: CharSet;
    const atOctalDigit: CharRange;
    const atAlphaNumeric: any;
    const atUnderscore: CharSet;
    const atSpace: CharSet;
    const atTab: CharSet;
    const atWs: CharSet;
    const atIdentifierNext: any;
    const letterLower: Rule;
    const letterUpper: Rule;
    const letter: any;
    const letters: any;
    const digit: Rule;
    const digitNonZero: Rule;
    const digits: Rule;
    const integer: Rule;
    const hexDigit: any;
    const binaryDigit: Rule;
    const octalDigit: Rule;
    const alphaNumeric: any;
    const underscore: Rule;
    const identifierFirst: any;
    const identifierNext: any;
    const identifier: any;
    const hyphen: Text;
    const crlf: Text;
    const newLine: any;
    const space: Text;
    const tab: Text;
    const ws: Rule;
    function tokenize(r: Rule, s: string): AstNode[];
    function parse(r: Rule, s: string): AstNode;
    function grammarAstRules(grammarName: string): any[];
    function grammarRules(grammarName: string): any[];
    function allGrammarRules(): any[];
    function grammarNames(): string[];
    function grammarToString(grammarName: string): string;
    function astSchemaToString(grammarName: string): string;
    function registerGrammar(grammarName: string, grammar: any, defaultRule: Rule): any;
    function escapeChars(text: string): string;
    function RuleTypeToRule(rule: RuleType): Rule;
    function debugAssert(condition: boolean, rule: Rule, message?: string): void;
}
