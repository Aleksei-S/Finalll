import { Injectable } from '@angular/core';

const url =
'https://maps.googleapis.com/maps/api/js?key=AIzaSyAjIoN3WveCBJsKiEcXQ6y0WmKGXyxVrus&libraries=places&callback=__onGoogleLoaded';

@Injectable()
export class LoadMapService {
  private static promise;

  load() {

        if (!LoadMapService.promise) {
            LoadMapService.promise = new Promise( resolve => {
                window['__onGoogleLoaded'] = (ev) => {
                      console.log('gapi loaded');
                      console.log(window);
                  resolve(ev);
                };
                console.log('loading..');
                const node = document.createElement('script');
                node.src = url;
                node.type = 'text/javascript';
                document.getElementsByTagName('head')[0].appendChild(node);
              });
          }
        return LoadMapService.promise;
      }

    }


// AIzaSyA_314OxmWH6Shuz2aBlL90oP3ObvOapMQ
// AIzaSyAjIoN3WveCBJsKiEcXQ6y0WmKGXyxVrus
// AIzaSyB6oLxb_fQkQD9b0m0w8Siiix8VEvRVjIc
