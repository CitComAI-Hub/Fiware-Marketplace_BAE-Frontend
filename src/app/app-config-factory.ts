import { MatomoInitializerService } from 'ngx-matomo-client';
import { AppInitService } from './services/app-init.service'; // Adjust path as necessary

export function appConfigFactory(appInitService: AppInitService, matomoInitializer: MatomoInitializerService): () => Promise<any> {
  return () => {
    return appInitService.init().then(conf => {
      if (!conf) {
        return;
      }
      const matomoConfigOptions = {
        siteId: conf.matomoId ?? '',
        trackerUrl: conf.matomoUrl ?? ''
      }
      if (matomoConfigOptions.siteId && matomoConfigOptions.trackerUrl) {
        matomoInitializer.initializeTracker(matomoConfigOptions)
      }
    });
  }
}
