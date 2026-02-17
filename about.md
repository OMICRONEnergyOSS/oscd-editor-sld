The editor is based around a pick and place palette.

It is designed to stay as close as possible to IEC 61850-6, but requires its own extension namespace, `https://openscd.org/SCL/SSD/SLD/v0` for storing graphical properties of elements and the geometric routing of connectivity nodes (within a `Private` element).

It allows drawing of multiple Substations. This can be used together with other plugins to add logical nodes and enhanced functionality.

When drawing an SLD, keep the following modelling requirements in mind:

- Voltage Levels are generally the first item which must be drawn
- Bays must be within Voltage Levels
- Transformers can be placed within Substations, Voltage Levels or Bays (within the SCL file, this is based on their center of rotation)
- Primary system busbars are modelled as a Bay with a single Connectivity Node

There is also a restriction in the SCL schema which means a Substation without a Voltage Level or a Voltage Level a Bay is not valid -- this means there is often a schema error noticed after initialising a Substation or placing a Voltage Level.

## Actions

Pressing `Esc` on the keyboard or clicking `x` on the palette will cancel an ongoing action.

### Context Menus

Most features are also available by right-clicking on an item or its label which brings up a context menu.
Directly opening the SCL wizard for the specific element can be done by middle-clicking on the item.
This is especially useful for renaming items quickly.
For Tap Changers and Transformer Windings, this must be done by using the context menu.

### Placing

After clicking on the palette, items can be placed.
During and after placing, a middle click will rotate equipment and transformers.

### Earthing

To earth a terminal, right-click on it.

### Rotating and Mirroring

To rotate a piece of Conducting Equipment or a transformer, middle-click on it.

To mirror, right-click and select the "Mirror" option.
Mirroring only works in the vertical dimension as pictured on the palette.

### Connecting

Connection points where a `Terminal` can be created are indicated by red dots.
Connection points where a `NeutralPoint` can be created (on transformers) are indicated by blue dots.
Connection points that can be earthed (by right clicking them) are circled in yellow. At the default zoom level, this may make red dots appear orange and blue dots appear green.

Connections are made by clicking on the connection point and then clicking for each corner in an orthogonal path.
Connections for Power Transformers must be made from the Power Transformer to the Conducting Equipment.

Generally it is best to connect the main "power flow" path first and then connect single terminal items (Earthing Switches, Voltage Transformers) subsequently otherwise it is possible to not have any red terminals left to connect to.

While connecting, valid target connection points are shown with a red triangle.
In the initial implementation, Power Transformers cannot be directly connected directly to other Power Transformers (in order to avoid data model problems).

### Moving

When moving an item, its connections are removed and reconnection is required. Sometimes this can affect a large number of connections (especially on Busbars).
It can be helpful to use undo (Ctrl+Z) and redo (Ctrl+Y) to see these connections.

Labels and `Text` can be moved by left-clicking on them.

Immediately adjacent items can be connected by clicking on the connection point and then the red triangle.

### Copying

Copy a Voltage Level, Bay, Transformer, or Conducting Equipment by holding `Shift` while clicking it or by selecting "copy" from the context menu.

It can be useful to scroll horizontally by holding down `Shift` on the keyboard while using the mouse wheel.

Copying Voltage Levels or Bays results in the removal of any connectivity which reaches outside of the copied element.

### Deleting

When an item is deleted, any unnecessary Connectivity Nodes are removed.

## Other Features

### Hide Labels

A "Hide Labels" toggle button on the palette (adjacent to the "Zoom In" button) is available to turn labels on and off to allow display of only the SLD symbols.

This also affects the SVG export.

### SVG Export

A "Download" button is available for an SVG 1.1 export which can be readily used in other software. Bay and Voltage Level borders and labels are not exported.

### Transformers

The tool currently supports a subset of possible transformers:

### IEDs

Items representing IEDs are placed within the extension namespace and within
the relevant Substation, VoltageLevel, or Bay element.
These items will be shown on the drawing even if the corresponding IED has
been removed.
There is an option within the IED menu to remove all unmatched IEDs.

## Help

## Issues and Limitations

Feel free to [file an issue](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/issues) if you would like to see a feature developed or discuss a problem that you've identified.

If you have a question about using the plugin or want to discuss potential for improvement, [start a discussion](https://github.com/OMICRONEnergyOSS/oscd-editor-sld/discussions) on our GitHub repository!

Current limitations are:

- Power Transformers cannot be connected directly to other Power Transformers
- Resizing or moving busbars results in a loss of other Conducting Equipment connections
- Copying Voltage Levels and Bays results in a loss of connections of the same Connectivity Node
- Only 3 phase functionality is provided (no single phase modelling)
