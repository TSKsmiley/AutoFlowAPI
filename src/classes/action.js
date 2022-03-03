


export default class Action {
    constructor(caller) {
        this.caller = caller;
    }
    execute() {
        // her kaster vi en error hvis der bliver oprettet en action frem for en class  der extenderer action
        throw new Error('Not implemented');
    }
}