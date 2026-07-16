export declare const eqTypes: readonly ["CAB", "CAP", "CBR", "CTR", "DIS", "GEN", "IFL", "LIN", "MOT", "REA", "RES", "SAR", "SMC", "VTR"];
export type EqType = (typeof eqTypes)[number];
export declare function isEqType(str: string): str is EqType;
export declare const ringedEqTypes: Set<string>;
export declare const singleTerminal: Set<string>;
