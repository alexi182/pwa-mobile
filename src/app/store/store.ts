import type { AnyObject } from 'antd/es/_util/type';
import { makeAutoObservable, toJS } from 'mobx';
import { getConfig } from '../config/getConfig.ts';
import { getTheme } from '../getTheme/getTheme.ts';
/*import axios from 'axios';
import LocalStorageService from '../../shared/utils/localStorageService/localStorageService.ts';
import { clientUnAuthorized } from '../../shared/auth-service/AuthServiceInt.ts';*/

interface State {
  config: AnyObject;
  properties: AnyObject;
  propertiesLoading: boolean;
  themeUiMetaData: string;
  themeUiMetaDataLoading: boolean;
}

class Store {
  state: State = {
    config: {},
    properties: {},
    propertiesLoading: false,
    themeUiMetaData: '',
    themeUiMetaDataLoading: false,
  };

  get config() {
    return toJS(this.state.config);
  }

  setConfig(config: AnyObject) {
    this.state.config = config;
  }

  get properties() {
    return toJS(this.state.properties);
  }

  setProperties(properties: AnyObject) {
    this.state.properties = properties;
  }

  get propertiesLoading() {
    return toJS(this.state.propertiesLoading);
  }

  setPropertiesLoading(propertiesLoading: boolean) {
    this.state.propertiesLoading = propertiesLoading;
  }

  get themeUiMetaData() {
    return toJS(this.state.themeUiMetaData);
  }

  setThemeUiMetaData(value: any) {
    this.state.themeUiMetaData = value;
  }

  get themeUiMetaDataLoading() {
    return this.state.themeUiMetaDataLoading;
  }

  setThemeUiMetaDataLoading(value: boolean) {
    this.state.themeUiMetaDataLoading = value;
  }

  storeInit() {
    getConfig()
      .then((config) => {
        if (config) {
          this.setConfig(config);
        }

        if (config?.THEME_API && config?.THEME_API_ACTIVE) {
          this.setThemeUiMetaDataLoading(true);
          getTheme(config?.THEME_API)
            .then((data) => {
              if (data) {
                this.setThemeUiMetaData(data);
              }
            })
            .catch((err) => {
              throw new Error(err);
            })
            .finally(() => {
              this.setThemeUiMetaDataLoading(false);
            });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  constructor() {
    makeAutoObservable(this);
    this.storeInit();
  }
}

const store = new Store();
export default store;
