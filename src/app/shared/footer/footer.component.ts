import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { LoginInfo } from 'src/app/models/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ThemeService } from 'src/app/services/theme.service';
import { EventMessageService } from '../../services/event-message.service';
import { NavHeaderLink, NavLink } from '../../themes';


@Component({
  selector: 'bae-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  private unSub = new Subject();

  protected readonly faGithub = faGithub;
  protected readonly faLinkedin = faLinkedin;

  checkLogged: boolean = false;
  feedback: boolean = false;
  isDomeTheme: boolean = false;

  socialLinks: { icon: any; url: string; label: string }[] = [];
  footerLinks: NavHeaderLink[] = [];
  defaultFooterLinks: NavLink[] = [];
  columns: number;

  constructor(
    private themeService: ThemeService,
    private localStorage: LocalStorageService,
    private eventMessage: EventMessageService,
    private router: Router) { }

  ngOnInit() {
    this.getCurrentThemeData();
    this.checkEventMessages();
    this.checkIfLogged();
  }

  private checkIfLogged() {
    const userInfo = this.localStorage.getObject('login_items') as LoginInfo;
    if ((JSON.stringify(userInfo) != '{}' && (((userInfo.expire - moment().unix()) - 4) > 0))) {
      this.checkLogged = true;
    }
  }

  private checkEventMessages() {
    this.eventMessage.messages$
      .pipe(takeUntil(this.unSub))
      .subscribe(ev => {
        if (ev.type === 'CloseFeedback') {
          this.feedback = false;
        }

        this.checkIfLogged();
      })
  }

  private getCurrentThemeData() {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.unSub))
      .subscribe((theme) => {
        this.isDomeTheme = (theme?.name || '').toUpperCase() === 'DOME';
        this.footerLinks = theme?.links?.footerLinks || [];
        this.defaultFooterLinks = this.footerLinks.flatMap((linkGroup) => linkGroup.navLinks || []);
        this.columns = theme?.links?.footerLinksColsNumber || 0;

        if ((theme?.name || '').toUpperCase() === 'CITCOM') {
          this.socialLinks = [
            {
              label: 'LinkedIn',
              url: 'https://www.linkedin.com/company/tef-citcom-smart-cities-and-communities/',
              icon: this.faLinkedin,
            },
            {
              label: 'GitHub',
              url: 'https://citcomai-hub.github.io/',
              icon: this.faGithub,
            },
          ];
        } else {
          this.socialLinks = [];
        }
      });
  }

  goToRoute(path: string) {
    this.router.navigate([path]);
  }

  openNewTab(path: string) {
    window.open(path, '_blank', 'noopener,noreferrer');
  }

  ngOnDestroy() {
    this.unSub.complete();
    this.unSub.unsubscribe();
  }
}
