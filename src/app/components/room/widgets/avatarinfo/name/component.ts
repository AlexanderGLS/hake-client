import { Component, ElementRef, ViewChild } from '@angular/core';
import { AvatarContextInfoView } from '../AvatarContextInfoView';

@Component({
    selector: 'nitro-room-avatarinfo-name-component',
    template: `
    <div #activeView class="nitro-room-avatarinfo-name-component context-menu">
        <div class="card align-items-center">
            <div class="d-flex card-header border-0 align-items-center w-100">{{ userName }}</div>
            <div class="card-pointer"></div>
        </div>
    </div>`
})
export class RoomAvatarInfoNameComponent extends AvatarContextInfoView
{
    @ViewChild('activeView')
    public activeView: ElementRef<HTMLDivElement>;

    public static setup(view: RoomAvatarInfoNameComponent, userId: number, userName: string, userType: number, roomIndex: number, willFade: boolean = false): void
    {
        view.willFade = willFade;
        
        AvatarContextInfoView.extendedSetup(view, userId, userName, userType, roomIndex);
    }
}