import { RecipeData, RecipeHelper } from './../../../app/model/recipe.model';
import { RecipeViewComponent } from './../../../app/components/recipe/recipe-view/recipe-view.component';
import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'src/libraries/services/localization.service';
import { RecipeModel } from 'src/app/model/recipe.model';

@Component({
  selector: 'share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss'],
})
export class ShareButtonsComponent implements OnInit {
  @Input() recipe: RecipeModel;
  @Input() url;
  base_urls: { [page: string]: string } = {
    email: 'mailto:?subject=%ttl%&body=%txt%',
    pinterest:
      'http://pinterest.com/pin/create/button/?url=%url%&description=%txt%',
    twitter: 'http://twitter.com/share?text=%txt%&url=%url%',
    facebook: 'http://www.facebook.com/sharer.php?u=%url%&p[title]=%txt%',
    tumblr:
      'http://www.tumblr.com/share/link?url=%url%&amp;name=%ttl%&amp;description=%txt%',
    linkedin:
      'http://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%ttl%&summary=%txt%&source=Recipe4you',
  };

  name: string;
  recipeData: RecipeData;

  constructor(public local: LocalizationService) {}

  ngOnInit(): void {
    this.recipeData = RecipeHelper.getData(this.recipe);

    if (!this.url) this.url = window.location.href;

    this.name = this.recipeData.name;
  }

  get_url(page: string): string {
    return this.base_urls[page]
      .replace('%txt%', this.local.data.share.txt)
      .replace('%ttl%', this.local.data.share.ttl)
      .replace('%nam%', this.name)
      .replace('%url%', this.url);
  }

  copy_link() {
    navigator.clipboard.writeText(this.url);
  }
}
