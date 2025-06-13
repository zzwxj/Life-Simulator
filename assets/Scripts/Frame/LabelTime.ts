import { Label, _decorator } from "cc";

const { ccclass, property, menu } = _decorator;

@ccclass("LabelTime")
@menu('ui/label/LabelTime')
export default class LabelTime extends Label {
    @property({
        tooltip: "到计时间总时间（单位秒）"
    })
    countDown: number = 1000;

    @property({
        tooltip: "天数数据格式化"
    })
    dayFormat: string = "{0}天";

    @property({
        tooltip: "无秒格式化"
    })
    noSecondFormat: string = "{0}:{1}";

    @property({
        tooltip: "时间格式化"
    })
    timeFormat: string = "{0}:{1}:{2}";

 

    @property({
        tooltip: "是否有00"
    })
    zeroize: boolean = true;

    @property({
        tooltip: "是否显示天数"
    })
    showDay: boolean = false;

    //private dateDisable!: boolean;
    private result!: string;

    /** 每秒触发事件 */
    onSecond: Function = null!;
    /** 倒计时完成事件 */
    onComplete: Function = null!;

    private replace(value: string, ...args: any): string {
        return value.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
    }

    /** 格式化字符串 */
    private format() {
        let c: number = this.countDown;
        let date: number = Math.floor(c / 86400);
        c = c - date * 86400;
        let hours: number = Math.floor(c / 3600);
        c = c - hours * 3600;
        let minutes: number = Math.floor(c / 60);
        c = c - minutes * 60;
        let seconds: number = c;

        // this.dateDisable = this.issh || false;
        if (date == 0 && hours == 0 && minutes == 0 && seconds == 0) {
            if (this.zeroize) {
                this.result = this.replace(this.timeFormat, "00", "00", "00");
            }
            else {
                this.result = this.replace(this.timeFormat, "0", "0", "0");
            }

        } else {
           
            if (this.showDay) {
               let dayformat = this.replace(this.dayFormat, date);
                this.result = dayformat + this.replace(
                    this.noSecondFormat,
                    this.zeroize?this.coverString(hours):hours,
                    this.zeroize?this.coverString(minutes):minutes);
                    
            } else {
                hours += date * 24;
                this.result = this.replace(
                    this.timeFormat,
                    this.zeroize?this.coverString(hours):hours,
                    this.zeroize?this.coverString(minutes):minutes,
                    this.zeroize?this.coverString(seconds):seconds)
            }
        }

        this.string = this.result;
    }

    /** 个位数的时间数据将字符串补位 */
    private coverString(value: number) {
        if (value < 10)
            return "0" + value;
        return value.toString();
    }

    /** 设置时间能否由天数显示 */
    // setDateDisable(flag: boolean) {
    //     this.dateDisable = flag;
    // }

    /** 设置倒计时时间 */
    setTime(second: number) {
        this.countDown = second;                                             // 倒计时，初始化显示字符串
        this.timing_end();
        this.timing_start();
    }

    start() {
        this.timing_start();
    }

    private onScheduleSecond() {
        this.countDown--;
        this.format();
        if (this.onSecond) this.onSecond(this.node);

        if (this.countDown == 0) {
            this.onScheduleComplete();
        }
    }

    private onScheduleComplete() {
        this.timing_end();
        if (this.onComplete) this.onComplete(this.node);
    }

    /** 开始计时 */
    private timing_start() {
        this.schedule(this.onScheduleSecond, 1);
        this.format();
    }

    private timing_end() {
        this.unscheduleAllCallbacks();
        this.format();
    }
}
