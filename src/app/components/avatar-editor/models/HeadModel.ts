import { AvatarEditorFigureCategory } from '../../../../client/nitro/avatar/enum/AvatarEditorFigureCategory';
import { FigureData } from '../../../../client/nitro/avatar/figuredata/FigureData';
import { CategoryBaseModel } from '../common/CategoryBaseModel';

export class HeadModel extends CategoryBaseModel
{
    public init(): void
    {
        super.init();

        this._Str_3130(FigureData.HR);
        this._Str_3130(FigureData.HA);
        this._Str_3130(FigureData.HE);
        this._Str_3130(FigureData.EA);
        this._Str_3130(FigureData.FA);

        this._Str_2367 = true;
    }

    public get name(): string
    {
        return AvatarEditorFigureCategory.HEAD;
    }
}