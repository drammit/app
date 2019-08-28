import {
  NavigationAction,
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
} from 'react-navigation';

let navigator: NavigationContainerComponent;
let queuedNavigations: NavigationAction[] = [];

export function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef;

  if (queuedNavigations.length > 0) {
    queuedNavigations.forEach(navigator.dispatch);
    queuedNavigations = [];
  }
}

export function navigate(routeName: string, params?: NavigationParams) {
  const action = NavigationActions.navigate({
    params,
    routeName,
  });

  if (!navigator) {
    queuedNavigations.push(action);
  } else {
    // make sure to always put in async pool
    setTimeout(() => navigator.dispatch(action), 0);
  }
}
