import { IAssetData } from '../../../../../core/asset/interfaces';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEditableRoomLinkLogic extends FurnitureLogic
{
    private _timer: any;

    public getEventTypes(): string[]
    {
        const types = [ RoomObjectWidgetRequestEvent.ROOM_LINK ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        super.initialize(asset);

        if(asset.action)
        {
            if(asset.action.link && (asset.action.link !== '') && (asset.action.link.length > 0))
            {
                (this.object && this.object.model && this.object.model.setValue<string>(RoomObjectVariable.FURNITURE_INTERNAL_LINK, asset.action.link));
            }
        }
    }

    public dispose(): void
    {
        super.dispose();

        if(this._timer)
        {
            clearTimeout(this._timer);

            this._timer = null;
        }
    }

    private setAutomaticStateIndex(state: number): void
    {
        if(!this.object) return;

        if(this.object.model)
        {
            this.object.model.setValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX, state);
        }
    }

    public useObject(): void
    {
        this.setAutomaticStateIndex(1);

        if(this._timer)
        {
            clearTimeout(this._timer);

            this._timer = null;
        }
        
        this._timer = setTimeout(() => 
        {
            this.setAutomaticStateIndex(0);

            this._timer = null;
        }, 2500);

        if(!this.eventDispatcher || !this.object) return;
        
        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ROOM_LINK, this.object));
    }
}