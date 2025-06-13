interface IEventData {
    func: Function;
    target: any;
}

interface IEvent {
    [eventName: string]: IEventData[];
}
export class EventListener {
    public static eventList: IEvent = {};

    public static init(){

    }

    public static on(eventName: string, cb: Function, target?: any) {
        if (!this.eventList[eventName]) {
            this.eventList[eventName] = [];
        }

        const data: IEventData = { func: cb, target };
        this.eventList[eventName].push(data);
    }

    public static off(eventName: string, cb: Function, target?: any) {
        const list = this.eventList[eventName];
        if (!list || list.length <= 0) {
            return;
        }

        for (let i = 0; i < list.length; i++) {
            const event = list[i];
            if (event.func === cb && (!target || target === event.target)) {
                list.splice(i, 1);
                break;
            }
        }
    }

    public static emit(eventName: string, ...args: any) {
        const list = this.eventList[eventName];
        if (!list || list.length <= 0) {
            return;
        }

        let curLen = list.length;
        for (let i = 0; i < list.length; i++) {
            const event = list[i];
            if (event) {
                event.func.apply(event.target, args);
                let offset = 0;
                if (curLen > list.length) {
                    offset = curLen - list.length;
                    i -= offset;
                    curLen = list.length;
                }
            }
        }
    }

    public static clear() {
        this.eventList = {};
    }
}

