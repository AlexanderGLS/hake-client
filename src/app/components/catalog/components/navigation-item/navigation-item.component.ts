import { Component, Input } from '@angular/core';
import { CatalogPageParser } from '../../../../../client/nitro/communication/messages/parser/catalog/CatalogPageParser';
import { CatalogPageData } from '../../../../../client/nitro/communication/messages/parser/catalog/utils/CatalogPageData';
import { Nitro } from '../../../../../client/nitro/Nitro';
import { CatalogService } from '../../services/catalog.service';

@Component({
    selector: 'nitro-catalog-navigation-item-component',
    templateUrl: './navigation-item.template.html'
})
export class CatalogNavigationItemComponent
{
    @Input()
    public catalogPage: CatalogPageData = null;

    constructor(private _catalogService: CatalogService) 
    {}

    public selectPage(): void
    {
        if(this.isActive)
        {
            this._catalogService.manuallyCollapsePage(this.catalogPage);

            return;
        }

        (this._catalogService.component && this._catalogService.component.selectPage(this.catalogPage));
    }

    public get activePage(): CatalogPageParser
    {
        return this._catalogService.activePage;
    }

    public get activePageData(): CatalogPageData
    {
        return this._catalogService.activePageData;
    }

    public get isDescendant(): boolean
    {
        return this._catalogService.isDescendant(this.catalogPage, this.activePageData);
    }

    public get isActive(): boolean
    {
        return ((this.catalogPage.pageId === (this.activePage && this.activePage.pageId)) || this.isDescendant);
    }

    public get isCollapsed(): boolean
    {
        return !!(this._catalogService.manuallyCollapsed.indexOf(this.catalogPage) >= 0);
    }

    public get isToggled(): boolean
    {
        if(this.isCollapsed) return false;

        if(this.isActive) return true;

        return false;
    }

    public get iconUrl(): string
    {
        return (Nitro.instance.getConfiguration<string>('catalog.asset.icon.url').replace('%name%', (this.catalogPage.icon || 0).toString()));
    }
}