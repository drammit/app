/* Redux Listener Types */
declare interface DispatchListener {
  type: string[] | string;
  listener: import('redux-listeners').ReduxListener;
}

/* Shape of the store */

declare interface LoadError {
  type: 'LoadError';
  name: string;
  message: string;
}

declare interface StoreResolvable<T> {
  isPending: boolean;
  isResolved: boolean;
  error?: LoadError;
  value: T;
}

declare interface StoreCurrentUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
}

declare interface DramSlainteShape {
  UserId: number;
  createdAt: Date;
}

declare interface DramCommentShape {
  id: number;
  UserId: number;
  comment: string;
  createdAt: Date;
}

declare interface DramShape {
  UserId: number;
  WhiskyId: number;
  id: number;
  name: string;
  rating: number;
  slaintes: DramSlainteShape[];
  comments: DramCommentShape[];
  image?: string;
  message?: string;
  createdAt: Date;
}

declare interface StoreDrams {
  [key: number]: StoreResolvable<DramShape>;
}

declare interface UserShape {
  id: number;
  username: string;
  subscription: boolean;
  name?: string;
  avatar?: string;
}

declare type StoreUser = StoreResolvable<UserShape>;

declare interface StoreUsers {
  [key: number]: StoreUser;
}

declare interface WhiskyShape {
  DistilleryId: number;
  BottlerId: number;
  CategoryId: number;
  id: number;
  name: string;
  fullName: string;
  bottlingSerie: string;
  size: string;
  age: number;
  abv: number;
  year: string;
  image?: string;
}

declare type StoreWhisky = StoreResolvable<WhiskyShape>;

declare interface StoreWhiskies {
  [key: number]: StoreWhisky;
}

declare interface DistilleryShape {
  CountryId: number;
  RegionId: number;
  id: number;
  name: string;
  image?: string;
}

declare type StoreDistillery = StoreResolvable<DistilleryShape>;

declare interface StoreDistilleries {
  [key: number]: StoreDistillery;
}

declare interface RegionShape {
  id: number;
  name: string;
}

declare type StoreRegion = StoreResolvable<RegionShape>;

declare interface StoreRegions {
  [key: number]: StoreRegion;
}

declare interface CountryShape {
  id: number;
  name: string;
}

declare type StoreCountry = StoreResolvable<CountryShape>;

declare interface StoreCountries {
  [key: number]: StoreCountry;
}

declare interface ProfileShape extends UserShape {
  id: number;
  createdAt: Date;
  followers: number;
  following: number;
  isFollowing: boolean;
  drams: number;
}

declare type StoreProfile = StoreResolvable<ProfileShape>;

declare interface StoreProfiles {
  [key: number]: StoreProfile;
}

declare interface StoreLoading {
  [table: string]: (string|number)[];
}

declare interface TimelineShape {
  loading: boolean;
  refreshing: boolean;
  end: boolean;
  items: DramShape['id'][];
}

declare interface StoreTimelines {
  [key: number]: TimelineShape;
}

declare interface StoreShape {
  countries: StoreCountries;
  distilleries: StoreDistilleries;
  drams: StoreDrams;
  profiles: StoreProfiles;
  users: StoreUsers;
  regions: StoreRegions;
  whiskies: StoreWhiskies;
  user: StoreCurrentUser;
  // loading: StoreLoading;
  timeline: TimelineShape | undefined;
  timelines: StoreTimelines;
}
