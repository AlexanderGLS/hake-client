import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { FriendCategoryData } from '../../incoming/friendlist/FriendCategoryData';

export class MessengerInitParser implements IMessageParser
{
    private _userFriendLimit: number;
    private _normalFriendLimit: number;
    private _extendedFriendLimit: number;
    private _categories: FriendCategoryData[];

    public flush(): boolean
    {
        this._userFriendLimit       = 0;
        this._normalFriendLimit     = 0;
        this._extendedFriendLimit   = 0;
        this._categories            = [];
        return true;
    }
    
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userFriendLimit       = wrapper.readInt();
        this._normalFriendLimit     = wrapper.readInt();
        this._extendedFriendLimit   = wrapper.readInt();

        const totalCategories = wrapper.readInt();

        while(totalCategories > 0)
        {
            this._categories.push(new FriendCategoryData(wrapper));
        }
        
        return true;
    }

    public get userFriendLimit(): number
    {
        return this._userFriendLimit;
    }

    public get normalFriendLimit(): number
    {
        return this._normalFriendLimit;
    }

    public get extendedFriendLimit(): number
    {
        return this._extendedFriendLimit;
    }

    public get categories(): FriendCategoryData[]
    {
        return this._categories;
    }
}