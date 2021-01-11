import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { IMessageEvent } from '../../../../client/core/communication/messages/IMessageEvent';
import { ModeratorMessageEvent } from '../../../../client/nitro/communication/messages/incoming/moderation/ModeratorMessageEvent';
import { HabboBroadcastMessageEvent } from '../../../../client/nitro/communication/messages/incoming/notifications/HabboBroadcastMessageEvent';
import { MOTDNotificationEvent } from '../../../../client/nitro/communication/messages/incoming/notifications/MOTDNotificationEvent';
import { Nitro } from '../../../../client/nitro/Nitro';
import { NotificationBroadcastMessageComponent } from '../components/broadcast-message/broadcast-message.component';
import { NotificationMainComponent } from '../components/main/main.component';

@Injectable()
export class NotificationService implements OnDestroy
{
    private _component: NotificationMainComponent;
    private _messages: IMessageEvent[];

    constructor(
        private _ngZone: NgZone)
    {
        this._component = null;

        this.registerMessages();
    }

    public ngOnDestroy(): void
    {
        this.unregisterMessages();
    }

    private registerMessages(): void
    {
        if(this._messages) this.unregisterMessages();

        this._messages = [
            new HabboBroadcastMessageEvent(this.onHabboBroadcastMessageEvent.bind(this)),
            new ModeratorMessageEvent(this.onModeratorMessageEvent.bind(this)),
            new MOTDNotificationEvent(this.onMOTDNotificationEvent.bind(this))
        ];

        for(let message of this._messages) Nitro.instance.communication.registerMessageEvent(message);
    }

    private unregisterMessages(): void
    {
        if(this._messages && this._messages.length)
        {
            for(let message of this._messages) Nitro.instance.communication.removeMessageEvent(message);
        }
    }

    private onHabboBroadcastMessageEvent(event: HabboBroadcastMessageEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._ngZone.run(() => this.alert(parser.message));
    }

    private onModeratorMessageEvent(event: ModeratorMessageEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        this._ngZone.run(() => this.alertWithLink(parser.message, parser.link));
    }

    private onMOTDNotificationEvent(event: MOTDNotificationEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        this._ngZone.run(() => this.alertWithScrollableMessages(parser.messages));
    }

    public alert(message: string, title: string = null): NotificationBroadcastMessageComponent
    {
        if(!this._component) return null;

        return this._component.alert(message, title);
    }

    public alertWithLink(message: string, link: string, title: string = null): NotificationBroadcastMessageComponent
    {
        if(!this._component) return null;

        return this._component.alertWithLink(message, link, title);
    }

    public alertWithConfirm(message: string, title: string = null, callback: Function = null): NotificationBroadcastMessageComponent
    {
        if(!this._component) return null;

        return this._component.alertWithConfirm(message, title, callback);
    }

    public alertWithScrollableMessages(messages: string[], title: string = null): NotificationBroadcastMessageComponent
    {
        if(!this._component) return null;

        return this._component.alertWithScrollableMessages(messages, title);
    }

    public closeAlert(component: NotificationBroadcastMessageComponent): void
    {
        if(!component || !this._component) return;

        this._component.close(component);
    }

    public closeAll(): void
    {
        if(!this._component) return;

        this._component.closeAll();
    }

    public get component(): NotificationMainComponent
    {
        return this._component;
    }

    public set component(component: NotificationMainComponent)
    {
        this._component = component;
    }
}