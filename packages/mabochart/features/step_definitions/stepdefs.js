import { strict as assert } from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { StateMachine } from "../../index.js";
import * as MachineDef from "./MachineDefs.js";

Given("una maquina de estados {string}", function (maquina) {
  let baseState = MachineDef[maquina.replaceAll(" ", "_")];
  const machine = new StateMachine(baseState);
  this.machine = machine;
});

Given("un contexto {string}", function (context) {
  this.context = JSON.parse(context);
});

When("la maquina inicia", function () {
  this.machine.start(this.context);
});

When("recibe evento {string}", function (evento) {
  try {
    this.machine.send(evento, this.context);
  } catch (e) {
    this.error = e;
  }
});

Then("el estado actual es {string}", function (string) {
  assert.ifError(this.error);
  assert.strictEqual(this.machine.currentState, string);
});

Then("tira error {string}", function (error) {
  assert.ok(this.error);
  assert.strictEqual(this.error.message, error);
});

Then("el contexto es", function (context) {
  assert.ifError(this.error);
  assert.deepStrictEqual(this.context, JSON.parse(context));
});
