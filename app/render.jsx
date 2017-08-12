import React from 'react';
import { render as reactRender } from 'react-dom';

const containerId = 'react-container';
let containerNode = document.getElementById(containerId);

if (!containerNode) {
  containerNode = document.createElement('div');
  containerNode.setAttribute('id', containerId);
  document.body.appendChild(containerNode);
}

export default function render(store) {
  return reactRender(<App />, MOUNT_NODE)
};
