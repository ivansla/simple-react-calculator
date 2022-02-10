import { timeStamp } from "console";

class Operator {
    readonly token:string;
    readonly precedence:number;
    readonly associativity:string;

    public static readonly powerOperator = new Operator('^', 4, 'right');
    public static readonly plusOperator = new Operator('+', 2, 'left');
    public static readonly minusOperator = new Operator('-', 2, 'left');
    public static readonly multiplyOperator = new Operator('*', 3, 'left');
    public static readonly divideOperator = new Operator('/', 3, 'left');
  
    private constructor(token: string, precedence: number, associativity:string) {
        this.token = token;
        this.precedence = precedence;
        this.associativity = associativity;
    }

    static getTokenOperator(token:string): Operator | never{
        if(Operator.plusOperator.token === token) {
            return Operator.plusOperator;
        }

        if(Operator.minusOperator.token === token) {
            return Operator.minusOperator;
        }

        if(Operator.multiplyOperator.token === token) {
            return Operator.multiplyOperator;
        }

        if(Operator.divideOperator.token === token) {
            return Operator.divideOperator;
        }

        if(Operator.powerOperator.token === token) {
            return Operator.powerOperator;
        }
        throw new Error;
    }
  }
class ShuntingYardParsingService {
    private _output:string[] = [];
    private _operatorStack:string[] = [];

    parse(expression: string[]):string[] {
        expression.forEach(token => {
            if(this._isNumber(token)) {
                this._output.push(token);
            } else {
                if(token === '(') {
                    this._operatorStack.push(token);
                } else if(token === ')') {
                    this._popStackUntilToken('(');
                } else if(!this._isEmpty(this._operatorStack) && this._hasStackOperatorHigherPrecendece(token)) {
                    let stackOperator = this._operatorStack.pop();
                    if(stackOperator) {
                        this._output.push(stackOperator);
                        this._operatorStack.push(token);
                    }
                } else {
                    this._operatorStack.push(token);
                }
            }
        });
        while(!this._isEmpty(this._operatorStack)) {
            let stackOperator = this._operatorStack.pop();
            if(stackOperator) {
                this._output.push(stackOperator);
            }
        }

        return this._output;
    }

    _popStackUntilToken(token:string) {
        while(!this._isEmpty(this._operatorStack)) {
            let stackOperator = this._operatorStack.pop();
            if(stackOperator) {
                if(stackOperator === token) {
                    break;
                } else {
                    this._output.push(stackOperator);
                }
            }
        }
    }

    _isEmpty(array: string[]): boolean {
        if(array) {
            return array.length === 0 ? true : false;
        }
        return false;
    }

    _isNumber(token: string): boolean {
        return !isNaN(Number(token));
    }

    _hasStackOperatorHigherPrecendece(token: string): boolean {
        let top  = this._operatorStack[this._operatorStack.length - 1];
        if(top === '(' || top === ')') {
            return false;
        }
        let stackOperator = Operator.getTokenOperator(top);
        let tokenOperator = Operator.getTokenOperator(token);
        if(stackOperator.precedence >= tokenOperator.precedence 
            && stackOperator.associativity !== 'right') {
            return true;
        }
        return false;
    }
}

export default ShuntingYardParsingService;