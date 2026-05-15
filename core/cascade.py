def trigger_failure(graph, initial_failure):
    queue = [initial_failure]
    failed = []

    while queue:
        current = queue.pop(0)

        if current not in graph.nodes:
            continue

        node = graph.nodes[current]

        if node.failed:
            continue

        node.failed = True
        failed.append(current)

        # propagate failure to dependent nodes
        for n in graph.nodes.values():
            if current in n.dependencies:
                queue.append(n.id)

    return failed
