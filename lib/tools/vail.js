import vm from 'node:vm';
import Debug from 'debug';
import { Parser as htmlparser } from 'htmlparser2';
import request from '../lifts/request.js';
import select from '../select.js';
import * as domutil from './domutil.js';

const debug = Debug('liftie:resort:vail');

const statuses = ['closed', 'open', 'hold', 'scheduled'];

function extractLiftData(script) {
  const context = { FR: {} };
  vm.runInNewContext(script, context);
  return context.FR?.TerrainStatusFeed?.Lifts || [];
}

function parseLiftStatus(dom) {
  const dataScript = select(dom, 'script')
    .map(script => domutil.allText(script).trim())
    .find(script => script.includes('TerrainStatusFeed = {'));

  const liftStatus = extractLiftData(dataScript).reduce((liftStatus, { Name, Status }) => {
    liftStatus[Name.trim()] = statuses[Status];
    return liftStatus;
  }, {});

  debug('vail Lift Status:', liftStatus);
  return liftStatus;
}

function followWaitingRoom(waitingRoom) {
  const pathParts = waitingRoom.split("'");
  const redirectUrl = {
    host: 'https://waitingroom.snow.com',
    pathname: pathParts[1]
  };

  return request(redirectUrl)
    .on('error', () => {
      return {};
    })
    .then(({ text }) => {
      if (!text) {
        return {};
      }
      return parseLiftStatus(htmlparser.parseDOM(text));
    });
}

// common parser for Vail Resorts lift status
export default function parse(dom) {
  const waitingRoom = select(dom, 'script')
    .map(script => domutil.allText(script).trim())
    .find(script => script.includes("document.location.href = '/?c=vailresorts"));

  return waitingRoom ? followWaitingRoom(waitingRoom) : parseLiftStatus(dom);
}
