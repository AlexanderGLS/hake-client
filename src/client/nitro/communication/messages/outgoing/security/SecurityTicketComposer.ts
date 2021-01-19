import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class SecurityTicketComposer implements IMessageComposer<ConstructorParameters<typeof SecurityTicketComposer>>
{
    private _data: ConstructorParameters<typeof SecurityTicketComposer>;

    constructor(ticket: string)
    {
        this._data = [ ticket ];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}