<script lang="ts">
  import { NumberInput } from "carbon-components-svelte";
  import { Configuration } from "../../../config";
  import { NetworkTables } from "../../../common";
  import { NetworkTablesStore } from "../../stores/NetworkTables";
  import { NetworkTablesTopic } from "../../../common";
  import { updateNetworkTablesTopics } from "../../stores/NetworkTables";
  
  const { Topics } = Configuration.Settings.NetworkTables;

  let launcherArmIntakePositionTopic: NetworkTablesTopic;

  let nt: NetworkTables;
  $: { 
    nt = $NetworkTablesStore; 
    launcherArmIntakePositionTopic = nt.topics.get(`${Topics.LauncherArmIntakePosition}`);
  }
</script>

<div class="main">
  <div class="title"><h4>Launcher</h4></div>
  <div class="controls">
    <NumberInput
      min={ 1 }
      max={ 14.5 }
      step={ 0.1 } 
      value={ launcherArmIntakePositionTopic?.value ?? 0 }
      label="Intake Position"
      on:change={ (e) => {
        updateNetworkTablesTopics([{
          id: 0,
          name: launcherArmIntakePositionTopic?.name,
          type: launcherArmIntakePositionTopic?.type,
          value: e.detail
        }]);
      } }
    />
  </div>
</div>

<style lang="postcss">
  .main {
    .title {
      margin-bottom: 1.5em;
      border-bottom: 1px solid var(--app-color-charcoal);
      padding: 0px 3px;
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }
</style>