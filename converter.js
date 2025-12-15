import { getReference } from '@openscd/scl-lib';
import { createElement } from '@openscd/scl-lib/dist/foundation/utils.js';
const oldNs = 'https://transpower.co.nz/SCL/SSD/SLD/v0';
const newNs = 'https://openscd.org/SCL/SSD/SLD/v0';
const oldPrefix = 'esld';
const nulledAttributes = {
    [`${oldPrefix}:x`]: null,
    [`${oldPrefix}:y`]: null,
    [`${oldPrefix}:w`]: null,
    [`${oldPrefix}:h`]: null,
    [`${oldPrefix}:lx`]: null,
    [`${oldPrefix}:ly`]: null,
    [`${oldPrefix}:rot`]: null,
    [`${oldPrefix}:flip`]: null,
    [`${oldPrefix}:color`]: null,
    [`${oldPrefix}:weight`]: null,
    [`${oldPrefix}:kind`]: null,
    [`${oldPrefix}:uuid`]: null,
};
function attributes(element) {
    return [
        'x',
        'y',
        'w',
        'h',
        'rot',
        'lx',
        'ly',
        'kind',
        'flip',
        'color',
        'weight',
        'uuid',
    ].map(name => element.getAttributeNS(oldNs, name));
}
function addVertexes(parentSection, vertex, nsd) {
    const newVertex = vertex.ownerDocument.createElementNS(newNs, `${nsd}:Vertex`);
    parentSection.appendChild(newVertex);
    const x = vertex.getAttributeNS(oldNs, 'x');
    const y = vertex.getAttributeNS(oldNs, 'y');
    const uuid = vertex.getAttributeNS(oldNs, 'uuid');
    if (x)
        newVertex.setAttributeNS(newNs, `${nsd}:x`, x);
    if (y)
        newVertex.setAttributeNS(newNs, `${nsd}:y`, y);
    if (uuid)
        newVertex.setAttributeNS(newNs, `${nsd}:uuid`, uuid);
}
function copySection(newPrivate, section, nsd) {
    const newSection = section.ownerDocument.createElementNS(newNs, `${nsd}:Section`);
    newPrivate.appendChild(newSection);
    const bus = section.getAttribute('bus');
    if (bus)
        newSection.setAttributeNS(newNs, `${nsd}:bus`, bus);
    const vertices = Array.from(section.querySelectorAll(':scope > Vertex'));
    vertices.forEach(vertex => addVertexes(newSection, vertex, nsd));
}
function copyConnNodePrivate(connNode, nsd) {
    const oldPrivate = connNode.querySelector(':scope > Private[type="Transpower-SLD-Vertices"]');
    if (!oldPrivate)
        return [];
    const newPrivate = createElement(connNode.ownerDocument, 'Private', {
        type: 'OpenSCD-SLD-Layout',
    });
    oldPrivate
        .querySelectorAll(':scope > Section')
        .forEach(section => copySection(newPrivate, section, nsd));
    const removeOldPrivate = {
        node: oldPrivate,
    };
    const insertPrivate = {
        parent: connNode,
        node: newPrivate,
        reference: getReference(connNode, newPrivate.tagName),
    };
    return [insertPrivate, removeOldPrivate];
}
function noLayoutAttributes(element) {
    return attributes(element).some(attr => attr !== null);
}
function pushToPrivate(element, nsd) {
    if (!noLayoutAttributes(element))
        return [];
    const resetOldAttributes = {
        element,
        attributes: {},
        attributesNS: {
            [`${oldNs}`]: nulledAttributes,
        },
    };
    const sldPrivate = createElement(element.ownerDocument, 'Private', {
        type: 'OpenSCD-SLD-Layout',
    });
    const sldAttributes = element.ownerDocument.createElementNS(newNs, `${nsd}:SLDAttributes`);
    sldPrivate.insertBefore(sldAttributes, null);
    const [x, y, w, h, rot, lx, ly, kind, flip, color, weight, uuid] = attributes(element);
    if (x)
        sldAttributes.setAttributeNS(newNs, `${nsd}:x`, x);
    if (y)
        sldAttributes.setAttributeNS(newNs, `${nsd}:y`, y);
    if (w)
        sldAttributes.setAttributeNS(newNs, `${nsd}:w`, w);
    if (h)
        sldAttributes.setAttributeNS(newNs, `${nsd}:h`, h);
    if (rot)
        sldAttributes.setAttributeNS(newNs, `${nsd}:rot`, rot);
    if (lx)
        sldAttributes.setAttributeNS(newNs, `${nsd}:lx`, lx);
    if (ly)
        sldAttributes.setAttributeNS(newNs, `${nsd}:ly`, ly);
    if (kind)
        sldAttributes.setAttributeNS(newNs, `${nsd}:kind`, kind);
    if (flip)
        sldAttributes.setAttributeNS(newNs, `${nsd}:flip`, flip);
    if (color)
        sldAttributes.setAttributeNS(newNs, `${nsd}:color`, color);
    if (weight)
        sldAttributes.setAttributeNS(newNs, `${nsd}:weight`, weight);
    if (uuid)
        sldAttributes.setAttributeNS(newNs, `${nsd}:uuid`, uuid);
    const insertPrivate = {
        parent: element,
        node: sldPrivate,
        reference: getReference(element, sldPrivate.tagName),
    };
    return [resetOldAttributes, insertPrivate];
}
function replaceNamespace(doc, nsd) {
    const scl = doc.querySelector(':root');
    const removeOldXmlNS = {
        element: scl,
        attributes: {
            'xmlns:esld': null,
        },
        attributesNS: {},
    };
    const setNewXmlNS = {
        element: scl,
        attributes: {
            [`xmlns:${nsd}`]: newNs,
        },
        attributesNS: {},
    };
    return [removeOldXmlNS, setNewXmlNS];
}
export function convertSldLayout(doc, nsd) {
    const processElements = doc.querySelectorAll(':root > Substation, :root > Substation :not(Section, Vertex)');
    const privateEdits = Array.from(processElements).flatMap(el => pushToPrivate(el, nsd));
    const connNodes = doc.querySelectorAll(':root > Substation ConnectivityNode');
    const sectionCopy = Array.from(connNodes).flatMap(connNode => copyConnNodePrivate(connNode, nsd));
    const namespaceEdits = replaceNamespace(doc, nsd);
    return [...privateEdits, ...sectionCopy, ...namespaceEdits];
}
export function hasOldNamespace(doc) {
    return !!doc.documentElement.lookupPrefix(oldNs);
}
//# sourceMappingURL=converter.js.map