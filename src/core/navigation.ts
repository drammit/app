import {
  NavigationAction,
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
} from 'react-navigation';

let navigator: NavigationContainerComponent;
const queuedNavigations: NavigationAction[] = [];

export function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef;

  if (queuedNavigations.length > 0) queuedNavigations.forEach(navigator.dispatch);
}

export function navigate(routeName: string, params?: NavigationParams) {
  const action = NavigationActions.navigate({
    params,
    routeName,
  });

  if (!navigator) {
    queuedNavigations.push(action);
  } else {
    navigator.dispatch(action);
  }
}
