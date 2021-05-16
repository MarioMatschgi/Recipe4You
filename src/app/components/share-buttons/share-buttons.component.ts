import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss'],
})
export class ShareButtonsComponent implements OnInit {
  @Input() url;
  base_urls: { [page: string]: string } = {
    pinterest:
      'http://pinterest.com/pin/create/button/?url=%url%&description=%txt%',
    twitter: 'http://twitter.com/share?text=%txt%&url=%url%',
    facebook: 'http://www.facebook.com/sharer.php?u=%url%&p[title]=%txt%',
    tumblr:
      'http://www.tumblr.com/share/link?url=%url%&amp;name=%title%&amp;description=%txt%',
    linkedin:
      'http://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%&summary=%txt%&source=recipe4you',
  };

  constructor() {}

  ngOnInit(): void {
    if (!this.url) this.url = window.location.href;
  }

  get_url(page: string): string {
    return this.base_urls[page]
      .replace('%url%', this.url)
      .replace('%txt%', 'TEXT')
      .replace('%title%', 'Recipe4you');
  }
}
