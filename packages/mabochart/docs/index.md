<a name="module_@mabo/chart"></a>

## @mabo/chart
A simple implementation of statecharts


* [@mabo/chart](#module_@mabo/chart)
    * [.StateMachine](#module_@mabo/chart.StateMachine)
        * [new exports.StateMachine(baseState)](#new_module_@mabo/chart.StateMachine_new)
        * [.start()](#module_@mabo/chart.StateMachine+start)
        * [.send(event, data)](#module_@mabo/chart.StateMachine+send)

<a name="module_@mabo/chart.StateMachine"></a>

### @mabo/chart.StateMachine
Class that represents a state chart machine

**Kind**: static class of [<code>@mabo/chart</code>](#module_@mabo/chart)  

* [.StateMachine](#module_@mabo/chart.StateMachine)
    * [new exports.StateMachine(baseState)](#new_module_@mabo/chart.StateMachine_new)
    * [.start()](#module_@mabo/chart.StateMachine+start)
    * [.send(event, data)](#module_@mabo/chart.StateMachine+send)

<a name="new_module_@mabo/chart.StateMachine_new"></a>

#### new exports.StateMachine(baseState)

| Param | Type | Description |
| --- | --- | --- |
| baseState | <code>Object</code> | The base state object, must define initial stata and other sub states |
| baseState.initial | <code>string</code> | The intial state of the machine |
| baseState.states | <code>Object</code> | The configuration of all child states, can be recursive |

<a name="module_@mabo/chart.StateMachine+start"></a>

#### stateMachine.start()
Starts the machine in the initial state

**Kind**: instance method of [<code>StateMachine</code>](#module_@mabo/chart.StateMachine)  
<a name="module_@mabo/chart.StateMachine+send"></a>

#### stateMachine.send(event, data)
Send an event to be processed by the machine

**Kind**: instance method of [<code>StateMachine</code>](#module_@mabo/chart.StateMachine)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event |
| data | <code>\*</code> | Arbitrary data to be provided to event handlers |

