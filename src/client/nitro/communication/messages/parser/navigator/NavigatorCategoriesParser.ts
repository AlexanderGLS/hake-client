import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';
import { NavigatorCategoryDataParser } from './NavigatorCategoryDataParser';

export class NavigatorCategoriesParser implements IMessageParser
{
    private _categories: NavigatorCategoryDataParser[];

    public flush(): boolean
    {
        this._categories = [];

        return true;
    }
    
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        let totalCategories = wrapper.readInt();

        while(totalCategories > 0)
        {
            this._categories.push(new NavigatorCategoryDataParser(wrapper));

            totalCategories--;
        }
        
        return true;
    }

    public get categories(): NavigatorCategoryDataParser[]
    {
        return this._categories;
    }
}