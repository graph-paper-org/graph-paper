<script>
    
import DataGraphic from '../../../DataGraphic/DataGraphic.svelte';
import LeftAxis from '../../../guides/LeftAxis.svelte';
import BottomAxis from '../../../guides/BottomAxis.svelte';
import Line from '../../Line.svelte';

export let points = 100;
export let curve = 'curveMonotoneX';
export let xMin = 0;
export let xMax = points -1;

let y = 100;

const data = Array.from({length: points}).map((_, x) => {
    y += (Math.random() - .5) * 10;
    return { x, y };
});

</script>

<DataGraphic
    xDomain={[xMin, xMax]}
    yDomain={[0, 200]}
    xType=linear
    yType=linear
>
    <LeftAxis />
    <BottomAxis />
    <Line {curve} {data} />
</DataGraphic>