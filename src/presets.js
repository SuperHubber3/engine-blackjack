// @flow
/*!
 engine-blackjack
 Copyright (C) 2016 Marco Casula

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import * as TYPES from './constants'
import { shuffle, newDecks } from '52-deck'
import type { SideBets, Rule, State } from './types'

export const getDefaultSideBets = (active: boolean = false) : SideBets => {
  return {
    luckyLucky: active,
    perfectPairs: active,
    royalMatch: active,
    luckyLadies: active,
    inBet: active,
    MatchTheDealer: active
  }
}

export const getRules = ({
  decks = 1,
  standOnSoft17 = false,
  double = 'any',
  split = false,
  doubleAfterSplit = false,
  surrender = true,
  insurance = false,
  showdownAfterAceSplit = false
}: Rule) => {
  return {
    decks: decks || 1,
    standOnSoft17: standOnSoft17,
    double: double,
    split: split,
    doubleAfterSplit: doubleAfterSplit,
    surrender: surrender,
    insurance: insurance,
    showdownAfterAceSplit: showdownAfterAceSplit
  }
}

export const defaultState = (rules: Rule) : State => {
  return {
    hits: 0,
    initialBet: 0,
    finalBet: 0,
    finalWin: 0,
    wonOnRight: 0,
    wonOnLeft: 0,
    stage: TYPES.STAGE_READY,
    deck: shuffle(newDecks(rules.decks)),
    handInfo: {
      left: {},
      right: {}
    },
    history: [],
    availableBets: getDefaultSideBets(true),
    sideBetsInfo: {},
    rules: rules,
    dealerHoleCard: null,
    dealerHasBlackjack: false,
    dealerHasBusted: false
  }
}
