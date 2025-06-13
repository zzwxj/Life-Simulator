export class NumberExtensions {
    public static readonly conversion: string[] = ["K", "M", "B", "TB", "AA", "BB", "CC", "DD", "EE", "FF"];
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    private InsertString(original: string, insert: string, position: number): string {
        if (position < 0) {
            position = 0; // 确保位置不小于 0
        } else if (position > original.length) {
            position = original.length; // 确保位置不大于原字符串长度
        }
        return original.slice(0, position) + insert + original.slice(position);
    }

    private trimEnd(input: string, chars: string = ' '): string {
        const regex = new RegExp(`[${chars}]+$`); // 创建正则表达式
        return input.replace(regex, ''); // 替换末尾的指定字符
    }

    toKMB(): string {
        let str = this.value.toString();//这个不是最优解因为最后显示也要是用string所以就先转了
        //int digits = (num == 0) ? 1 : (int)Math.Log10(Math.Abs(num)) + 1; 判断位数的最优解
        let len = str.length;

        if (len < 6)
            return Math.floor(this.value).toString();

        let l = len - 6;
        let n = Math.floor(l / 3);
        //假如要显示的数是 11223344 一共8位 减去6 等于2 然后除3 然后向下取整等于0
        //最后取模 显示 112.23K
        let s = NumberExtensions.conversion[n];// < 3 ? "K" : l < 6 ? "M" : l < 9 ? "B" : l < 12 ? "TB" : "AA";
        switch (l % 3) {
            case 0:
                str = this.InsertString(str, '.', 3)
                str = this.trimEnd(this.trimEnd(str.slice(0, 5), '0'), '.')
                break;
            case 1:
                str = this.InsertString(str, ',', 1)
                str = str.slice(0, 5);
                break;
            case 2:
                str = this.InsertString(str, ',', 2)
                str = str.slice(0, 4);
                break;
        }
        str += s;


        return str;
    }
}