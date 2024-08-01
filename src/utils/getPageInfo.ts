import { GetLayoutWidthRatio } from "@/components/nav/nav";

export function GetPageWidth(): number {
    return window.innerWidth * (1 - GetLayoutWidthRatio());
}

