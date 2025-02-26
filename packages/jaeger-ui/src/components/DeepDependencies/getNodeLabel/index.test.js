// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { shallow } from 'enzyme';

import DdgNode from './DdgNode';
import getNodeLabel from './index';

describe('getNodeLabel()', () => {
  let ddgVertex;

  beforeEach(() => {
    ddgVertex = {
      isFocalNode: false,
      key: 'some-key',
      operation: 'the-operation',
      service: 'the-service',
    };
  });

  it('returns a <DdgNode/>', () => {
    const ddgNode = getNodeLabel({})(ddgVertex);
    expect(ddgNode).toBeDefined();
    const wrapper = shallow(ddgNode);
    expect(wrapper).toMatchSnapshot();
    expect(ddgNode.type).toBe(DdgNode);
  });

  it('renders as a focal node when isFocalNode == true', () => {
    ddgVertex.isFocalNode = true;
    const ddgNode = getNodeLabel({})(ddgVertex);
    expect(ddgNode).toBeDefined();
    const wrapper = shallow(ddgNode);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a UiFindMatch when in provided set', () => {
    const otherVertex = {
      key: 'other-key',
    };
    const uiFindMatches = new Set([otherVertex]);

    let ddgNode = getNodeLabel({ uiFindMatches })(ddgVertex);
    expect(ddgNode.props.isUiFindMatch).toBe(false);

    uiFindMatches.add(ddgVertex);
    ddgNode = getNodeLabel({ uiFindMatches })(ddgVertex);
    expect(ddgNode.props.isUiFindMatch).toBe(true);
  });
});
