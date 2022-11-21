/* eslint-disable no-unused-vars */

export enum LOADING_STATE {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export enum TASK_STATUS {
  BACKLOG = 'BACKLOG',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE'
}

export enum SEVERITY {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum USER_STATUS {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED'
}

export enum USER_PERMISSION {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER'
}

export enum SORT_TYPE {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}

export enum USER_AVAILABILITY {
  AVAILABLE = 'AVAILABLE',
  AWAY = 'AWAY',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE'
}
