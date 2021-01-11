﻿import { Component } from '@angular/core';
import { Triggerable } from '../../../../../../client/nitro/communication/messages/incoming/roomevents/Triggerable';
import { WiredMainComponent } from '../../main/main.component';
import { WiredCondition } from '../WiredCondition';
import { WiredConditionType } from '../WiredConditionType';

@Component({
    templateUrl: './has-stacked-furnis.template.html'
})
export class HasStackedFurnisComponent extends WiredCondition
{
    public static CODE: number = WiredConditionType.HAS_STACKED_FURNIS;
	public requireall: string = '0';

    public get code(): number
    {
        return HasStackedFurnisComponent.CODE;
    }

    public get requiresFurni(): number
    {
        return WiredMainComponent._Str_4873;
    }

	public onEditStart(trigger: Triggerable): void
    {
        this.requireall = (((trigger.intData.length > 0) && (trigger.intData[0] === 1)) ? '1' : '0');
	}

	public readIntegerParamsFromForm(): number[]
    {
        return [ ((this.requireall === '1') ? 1 : 0) ];
    }

    public get hasSpecialInputs(): boolean
    {
        return true;
    }
}
